var list=!1,scoutArrayKeymap=[["scout","firstName"],["scout","lastName"],["scout","email"],["scout","homePhone"],["scout","slack"],["scout","joinDate"],["scout","active"],["scout","WFATrained"],["scout","school"],["scout","cellPhone"],["father","firstName"],["father","lastName"],["father","cellPhone"],["father","email"],["father","slack"],["mother","firstName"],["mother","lastName"],["mother","cellPhone"],["mother","email"],["mother","slack"]];function getSlackLink(e,t,a,r){firebase.database().ref("/directory/slackUID/").once("value").then(function(o){var s=o.val(),l=encodeUsername(e);null==s||null==s[l]||void 0==s[l]?$.ajax({url:`https://slack.com/api/users.list?token=${t}`,method:"GET",dataType:"json"}).done(function(t){var o=t.members,s={};for(i=0;i<o.length;i++)o[i].deleted||(""!=o[i].profile.display_name&&void 0!=o[i].profile.display_name?displayName=o[i].profile.display_name:displayName=o[i].profile.real_name,s[encodeUsername(displayName)]=o[i].id,displayName==e&&a(o[i].id,e,truea,r));firebase.database().ref("/directory/slackUID/").update(s)}):a(s[l],e,!1,r)})}function encodeUsername(e){return encodeURIComponent(e).replaceAll(".","%2E")}function decodeUsername(e){return decodeURIComponent(e)}function onhashchange(e,t){if(""!=window.location.hash){var a=parseInt(window.location.hash.substring(1),10);if(!(Number.isNaN(a)||a<0||a>=e.length)){var r,o=["scout","father","mother"];for(i=0;i<3;i++)""==e[a][o[i]].slack||void 0==e[a][o[i]].slack?($(".infoModal-"+o[i]+"SlackDMLink").attr("href",null),$(".infoModal-"+o[i]+"SlackUsername").html("<i>Not listed in spreadsheet</i>"),$(".infoModal-"+o[i]+"SlackDMLoadingText").text("")):"none"==e[a][o[i]].slack.toLowerCase()?($(".infoModal-"+o[i]+"SlackDMLink").attr("href",null),$(".infoModal-"+o[i]+"SlackUsername").html("<i>None</i>"),$(".infoModal-"+o[i]+"SlackDMLoadingText").text("")):($(".infoModal-"+o[i]+"SlackUsername").text("@"+e[a][o[i]].slack),$(".infoModal-"+o[i]+"SlackDMLoadingText").text("(profile loading...)"),getSlackLink(e[a][o[i]].slack,t.slackToken,function(e,t,a,r){$(".infoModal-"+o[r]+"SlackDMLink").attr("href","https://t485.slack.com/messages/message/team/"+e),$(".infoModal-"+o[r]+"SlackDMLoadingText").text("")},i));for(var s=0;s<scoutArrayKeymap.length;s++){console.log(scoutArrayKeymap[s][1]),$(".infoModal-"+scoutArrayKeymap[s][0]+scoutArrayKeymap[s][1].substring(0,1).toUpperCase()+scoutArrayKeymap[s][1].substring(1)+"Link").attr("href",null),void 0==r||""==r?r="Not listed in spreadsheet.":"active"==scoutArrayKeymap[s][1]||"WFATrained"==scoutArrayKeymap[s][1]?r="Y"==r||"y"==r?"Yes":"N"==r||"n"==r?"No":"R"==r||"r"==r?"Rarely":r:"email"==scoutArrayKeymap[s][1]||"Email"==scoutArrayKeymap[s][1]?$(".infoModal-"+scoutArrayKeymap[s][0]+scoutArrayKeymap[s][1].substring(0,1).toUpperCase()+scoutArrayKeymap[s][1].substring(1)+"Link").attr("href","mailto:"+r):"cellPhone"!=scoutArrayKeymap[s][1]&&"CellPhone"!=scoutArrayKeymap[s][1]&&"homePhone"!=scoutArrayKeymap[s][1]&&"HomePhone"!=scoutArrayKeymap[s][1]||$(".infoModal-"+scoutArrayKeymap[s][0]+scoutArrayKeymap[s][1].substring(0,1).toUpperCase()+scoutArrayKeymap[s][1].substring(1)+"Link").attr("href",""==r.replace(/\D/g,"")?null:"tel:"+r.replace(/\D/g,""));scoutArrayKeymap[s][1];$(".infoModal-"+scoutArrayKeymap[s][0]+scoutArrayKeymap[s][1].substring(0,1).toUpperCase()+scoutArrayKeymap[s][1].substring(1)).text(r)}for(i=0;i<o.length;i++)void 0==e[a][o[i]].firstName||""==e[a][o[i]].firstName||void 0==e[a][o[i]].lastName||""==e[a][o[i]].lastName?($(".infoModal-"+o[i]+"FullNameElement").addClass("hidden"),$(".infoModal-"+o[i]+"FirstNameElement").removeClass("hidden"),$(".infoModal-"+o[i]+"LastNameElement").removeClass("hidden")):$(".infoModal-"+o[i]+"FullName").text(e[a][o[i]].firstName+" "+e[a][o[i]].lastName);$("#infoModal").modal("show")}}}function getColVisibility(e){return $("#filter-select").val().map(e=>parseInt(e,10)).indexOf(e)>-1}function filterselectchange(){var e=$("#filter-select").val().map(e=>parseInt(e,10)),t=[];for(i=0;i<21;i++)e.indexOf(i)>-1?($(".col"+i).removeClass("hidden"),t.push(i)):$(".col"+i).addClass("hidden");var a=[0,1,2,3,4,10],r=!1;if(e.length==a.length)for(i=0;i<a.length&&a.indexOf(e[i])>-1;i++)i==a.length-1&&(r=!0);r?setURLQuery(setQuery("filter",null)):setURLQuery(setQuery("filter",t.join(",")))}function processURLOptions(){var e={filter:getQuery("filter")&&getQuery("filter").length>0?getQuery("filter").split(",").map(e=>parseInt(e,10)):void 0,sortby:parseInt(getQuery("sortby"),10),sortorder:getQuery("sortorder")};checkDefaultOptions(),setOptions(merge({sortby:1,sortorder:"asc",filter:[0,1,2,3,4,10]},e))}function checkDefaultOptions(){var e=1,t="asc",a=[0,1,2,3,4,10],r=getQuery("filter")&&getQuery("filter").length>0?getQuery("filter").split(",").map(e=>parseInt(e,10)):void 0,o=Number.isInteger(parseInt(getQuery("sortby"),10))?parseInt(getQuery("sortby"),10):getQuery("sortby"),s=getQuery("sortorder"),i=r==a||""==r||null==r,l=o==e||""==o||null==o,n=s==t||""==s||null==s,c=""==$("#search").val()||null==$("#search").val();i&&l&&n&&c?(history.pushState("",document.title,window.location.pathname+window.location.hash),$("#modified-settings").addClass("hidden")):$("#modified-settings").removeClass("hidden")}function merge(e,t){for(var a in t)t.hasOwnProperty(a)&&null!==t[a]&&void 0!==t[a]&&""!=t[a]&&(e[a]=t[a]);return e}function setOptions(e){for(i=0;i<=20;i++)$("#filter-select option[value="+i+"]").attr("selected",e.filter.indexOf(i)>-1?"":null);for($("#filter-select").selectpicker("refresh"),filterselectchange(),i=0;i<=20;i++)$("#sortby-select option[value="+i+"]").attr("selected",e.sortby==i?"":null);$("#sortby-select").selectpicker("refresh"),$("#sortby-select").trigger("change"),$("#sortorder-select option[value="+e.sortorder+"]").attr("selected",""),$("#sortorder-select option[value="+("asc"==e.sortorder?"desc":"asc")+"]").attr("selected",null),$("#sortorder-select").selectpicker("refresh"),$("#sortorder-select").trigger("change"),list&&(list.search($("#search").val()),list.sort("col"+$("#sortby-select").val(),{order:$("#sortorder-select").val()})),$("#search").val(getQuery("query")),$("#search").trigger("keyup")}firebase.database().ref("/directory/keys/").once("value").then(function(e){var t=e.val();for($(".link-google-sheet-dir").attr("href",`https://docs.google.com/spreadsheets/d/${t.id}/edit`),rangeString="",i=0;i<t.sheets.length;i++)rangeString+=`ranges=${t.sheets[i]}!A2:U&`;$.ajax({url:`https://sheets.googleapis.com/v4/spreadsheets/${t.id}/values:batchGet/?${rangeString}majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=${t.api}`,method:"GET",dataType:"json"}).done(function(e){$("#loading-text").addClass("hidden");var a=e.valueRanges,r=[["scout","firstName"],["scout","lastName"],["scout","email"],["scout","homePhone"],["scout","slack"],["scout","job"],["scout","joinDate"],["scout","active"],["scout","WFATrained"],["scout","school"],["scout","cellPhone"],["father","firstName"],["father","lastName"],["father","cellPhone"],["father","email"],["father","slack"],["mother","firstName"],["mother","lastName"],["mother","cellPhone"],["mother","email"],["mother","slack"]],o=[],s=0;for(i=0;i<a.length;i++){var l=a[i].values,n=t.sheets[i];for(j=0;j<l.length;j++){var c="<tr class='table-row'>";o[s]={scout:{},father:{},mother:{}};var d=0;for(k=0;k<l[j].length+1;k++)2!=k?(getColVisibility(k)?hidden="":hidden="hidden",c+="<td class='col"+k+" "+hidden+"' data-col='"+k+"' data-row='"+s+"'>"+l[j][d]+"</td>",o[s][r[d][0]][r[d][1]]=l[j][d],d++):(getColVisibility(k)?hidden="":hidden="hidden",c+="<td class='col"+k+" "+hidden+"' data-col='"+k+"' data-row='"+s+"'>"+n+"</td>",o[s][r[d][0]][r[d][1]]=n);c+="</tr>",s++,$("#dir-body").append(c)}}$("#table").on("click",".table-row",function(e){var t=$(e.target).attr("data-row");window.location.hash=t}),$(window).on("hashchange",function(){onhashchange(o,t)}),$(document).ready(function(){onhashchange(o,t)});var u=[];for(i=0;i<l[0].length+1;i++)u.push("col"+i);(list=new List("directory-list",{valueNames:u})).search($("#search").val()),list.sort("col"+$("#sortby-select").val(),{order:$("#sortorder-select").val()}),$("#sortby-select, #sortorder-select").change(function(){list.sort("col"+$("#sortby-select").val(),{order:$("#sortorder-select").val()}),setURLQuery(setQuery("sortby",$("#sortby-select").val())),setURLQuery(setQuery("sortorder",$("#sortorder-select").val()))})})}),$(document).ready(function(){processURLOptions(),$("#infoModal").on("hide.bs.modal",function(){history.pushState("",document.title,window.location.pathname+window.location.search)})}),$("#filter-select").change(filterselectchange),$("#search").keyup(function(){setURLQuery(setQuery("query",encodeURIComponent($("#search").val())))}),/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)&&$(".selectpicker").selectpicker("mobile");