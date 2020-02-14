import React from "react"

import Layout from "../../../components/layout/layout"
import SEO from "../../../components/seo"
import { Table, Button } from "react-bootstrap";
import { FirebaseContext, useFirebase } from "gatsby-plugin-firebase";

const PLCVotingAdminPage = () => {
  const [devices, setDevices] = React.useState({});
  const firebase = React.useContext(FirebaseContext);

  useFirebase(firebase => {
    setDevices({});// this is ok because useFirebase only gets called once
    firebase
      .firestore()
      .collection("plcvoting")
      .doc("test")
      .collection("devices")
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
          let deviceId = doc.id;
          let currentVoter = doc.data();
          if (currentVoter.currentlyVoting) {
            setDevices(oldDevices => {
              let newDevices = Object.assign({}, oldDevices);
              if (!newDevices[deviceId]) newDevices[deviceId] = {};
              newDevices[deviceId]["currentlyVoting"] = {
                name: currentVoter.voteInProgress.name,
                status:{
                  vote:"Voting",
                  verify:"Reviewing Selection",
                  Unknown:"Unknown"
                }[currentVoter.voteInProgress && currentVoter.voteInProgress.status ? currentVoter.voteInProgress.status.mode || "Unknown" : "Unknown"] || "Unknown",
                statusColor:"warning",
                voterId: currentVoter.voteInProgress.voterId,
                timestamp: currentVoter.voteInProgress.startTimestamp,
                submitted:false
              }
              return newDevices;
            })
          }

          firebase
            .firestore()
            .collection("plcvoting")
            .doc("test")
            .collection("devices")
            .doc(deviceId)
            .collection("votes")
            .onSnapshot((voterQueryShapshot) => {
              voterQueryShapshot.forEach(voter => {
                let voterId = voter.id;
                setDevices(oldDevices => {
                  let newDevices = Object.assign({}, oldDevices);
                  if (!newDevices[deviceId]) newDevices[deviceId] = {};
                  newDevices[deviceId][voterId] = {
                    name: voter.data().name,
                    status: "Done",
                    statusColor:"success",
                    timestamp:voter.data().timestamp,
                    stage:true
                  }
                  return newDevices;
                })

              });
            })


        })
      });
  }, []);


  let table = [];
  if(devices) {
    // Sort devices so the same general order is presented
    // all unsubmitted ones must be on top, but otherwise the newest ones should be earlier

    for (let [deviceid, docs] of Object.entries(devices)) {
      if (docs) {

        for (let [docid, data] of Object.entries(docs)) {
          let confirmed = !(docid === "currentlyVoting");
          if (!confirmed && data.voterId && !!docs[data.voterId]) continue;
          // data.voterId only exists on unassigned users.
          table.unshift(
            {
              submitted:data.submitted,
              timestamp:data.timestamp,
          element:<tr key={deviceid + "" + docid}>
              <td>{deviceid}</td>
              <td>{data.voterId || docid}</td>
              <td>{data.name}</td>
              <td className={"text-" + data.statusColor}>{data.status}</td>
              <td>{confirmed?<Button variant="danger">Remove Vote</Button> : <Button variant="danger">J'Accuse!</Button>}</td>
            </tr>})
        }
      }
    }
    table.sort((a, b) => {
      if (a.submitted !== b.submitted) {
        return a.submitted ? 1 : -1; // a should be less than b to get sorted first
      }
      return b.timestamp - a.timestamp;
    });

  }
  return (
    <Layout>
      <SEO title="PLC Voting | Admin" />
      <h1>PLC Voting Admin</h1>
      <b>Devices</b>
      <p>{table.length} ballots tallied</p>
      <Table responsive hover>
        <thead>
        <tr>
          <th>Device ID</th>
          <th>Voter ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Manage</th>
        </tr>
        </thead>
        <tbody>
        {table.map(el => el.element)}
        </tbody>
      </Table>
    </Layout>
  )
}

export default PLCVotingAdminPage;
