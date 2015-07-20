<!DOCTYPE html>
<html>
  <head>

    <link href='http://fonts.googleapis.com/css?family=Old+Standard+TT:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="styles/css/style.css" css="">
  </head>
  <body>
    <div id="App">
    </div>
     <?php

      echo <<<EOHTML
    <!-- build:js scripts/bundle.js?v=@@version async -->
    <script async src="build/bundle.js"></script>
    <!-- endbuild -->
EOHTML;

    ?>

  </body>
</html>