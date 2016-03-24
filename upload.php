<?php
   if(isset($_FILES['image'])){
      $errors= array();
      $file_name = $_POST['file-name'];
      $file_size = $_FILES['image']['size'];
      $file_tmp = $_FILES['image']['tmp_name'];
      $file_type = $_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
      
      $expensions= array("php");
      
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="PHP files are not allowed, please do not upload php files.";
      }
      if (file_exists($file_name)) {
        $errors[]="The file http://t485.org/file/$file_name already exists. Please change the name.";
    }
      
      if(empty($errors)==true) {
         move_uploaded_file($file_tmp,"file/".$file_name);
         echo "The file has been uploaded to <a href='"."file/".$file_name."'>"."file/".$file_name."</a>";
      }else{
         print_r($errors);
      }
   }
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Join Troop 485 in Cupertino to experience an excellent Scouting experience">
    <meta name="author" content="Richard Liu">

    <link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="favicons/manifest.json">
    <meta name="theme-color" content="#008000">

    <title>File Upload - Troop 485</title>

    <!-- Bootstrap Core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/t485.css" rel="stylesheet">
    <link href="css/dropzone.min.css" rel="stylesheet">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <style>
.btn-file {
  position: relative;
  overflow: hidden;
}
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  background: red;
  cursor: inherit;
  display: block;
}
input[readonly] {
  background-color: white !important;
  cursor: text !important;
}
    </style>
</head>

<body>

    <a href="index.html"><img src="img/header.gif" id="header" alt="Troop 485 banner" width="990" height="151"></a>

    <!-- Navigation -->
    <nav class="navbar navbar-default">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- navbar-brand is hidden on larger screens, but visible when the menu is collapsed -->
                <a class="navbar-brand" href="index.html">T485</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a href="calendar.html">Calendar</a>
                    </li>
                    <li>
                        <a href="new-scout.html">New Scout</a>
                    </li>
                    <li>
                        <a href="forum.html">Forum</a>
                    </li>
                    <li>
                        <a href="pictures.html">Pictures</a>
                    </li>
                    <li class="dropdown">
                        <a>FAQ <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="faq.html">FAQ</a></li>
                            <li><a href="merit-badges.html">Merit Badges</a></li>
                            <li><a href="eagle.html">Path to Eagle</a></li>
                            <li><a href="smc.html">SMC &amp; BOR</a></li>
                            <li><a href="plc.html">What is PLC?</a></li>
                            <li><a href="about.html">About</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a>Resources <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="resources.html">Resources</a></li>
                            <li><a href="meeting-minutes.html">Meeting Minutes</a></li>
                            <li><a href="books.html">Books</a></li>
                            <li><a href="troop-jobs.html">Troop Jobs</a></li>
                            <li><a href="ranks.html">Ranks</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="directory.html">Directory </a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <a href="#" id="toTop"></a>


    <div class="container">

        <div class="row">
            <div class="box">
                <div class="col-lg-12">
                    <hr>
                    <h2 class="intro-text text-center">File Upload</h2>
                    <hr>
                </div>
                <div class="col-md-12">
                    <div id="file-upload">
                        <form action = "" method = "POST" enctype = "multipart/form-data">
                             <input type = "file" name = "image" />
                             <div class="input-group">
                                <input type="text" class="form-control" readonly>

                                <span class="input-group-btn">
                                    <span class="btn btn-primary btn-file">
                                        Browse&hellip; <input type = "file" name = "image" />
                                    </span>
                                </span>
                            </div>
                             <p>File Location:</p>
                             <input type="text" name="file-name" class="form-control">
                             <input type = "submit" class="btn btn-primary form-control"/>

                    			
                          </form>
                          
                    </div>
                <div class="clearfix"></div>
            </div>
        </div>

    </div>
    <!-- /.container -->

    <footer>
        <div class="container">
            <div class="box">
                <div class="col-lg-12 text-center">
                    <p>Copyright &copy; 2006-2016 Troop 485, Silicon Valley Monterey Bay Council, Boy Scouts of America</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
        <script src="js/dropzone.min.js"></script>
    <script>$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
        
    });
});</script>
    <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>

    <script src="js/t485.js"></script>
    
    <!-- Bootstrap Core JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

    <!-- Clicky Web Analytics -->
    <script src="https://static.getclicky.com/js"></script>
    <script>
        try {
            clicky.init(100869133)
        }
        catch (e) {}
    </script>
    <noscript><img alt="Clicky" src="https://in.getclicky.com/100869133ns.gif"></noscript>

</body>

</html>
