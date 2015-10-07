<!DOCTYPE html>
<html>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Expletus+Sans:400,700' rel='stylesheet' type='text/css'>
        <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' rel='stylesheet' type='text/css'>

        <link rel="stylesheet" href="styles/css/style.css" css="">
        <title></title>

    </head>

    <body>

        <div id="App"></div>

     <?php

      echo <<<EOHTML
    <!-- build:js scripts/bundle.js?v=@@version async -->
    <script async src="build/bundle.js"></script>
    <!-- endbuild -->
EOHTML;

    ?>

    </body>
</html>