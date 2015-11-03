<!DOCTYPE html>
<html>
    <head>
        <title>Vincent Chan: Front-end Developer</title>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="A showcase of web development and design work by Vincent Chan">
        <meta name="keywords" content="vincent chan, web developer, front-end, designer, portfolio, showcase" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <!-- facebook  -->
        <meta property="og:title" content="Vincent Chan: Front-end Developer" />
        <meta property="og:url" content="http://www.vincentchan.me" />
        <meta property="og:site-name" content="Vincent Chan: Front-end Developer" />
        <meta property="og:type" content="profile">
        <meta property="og:description" content="A showcase of web development and design work by Vincent chan">

        <!-- twitter  -->
        <meta name="twitter:site" content="http://www.vincentchan.me" />
        <meta name="twitter:creator" content="" />
        <meta name="twitter:title" content="Vincent Chan: Front-end Developer" />
        <meta name="twitter:description" content="A showcase of web development and design work by Vincent Chan"/>

        <link href='https://fonts.googleapis.com/css?family=Karla:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="styles/css/style.css" css="">

        <!-- favicons  -->
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    </head>

    <body>

        <div id="container"></div>
        <div id="App"></div>

     <?php

      echo <<<EOHTML
    <!-- build:js scripts/bundle.js?v=@@version async -->
    <script async src="build/bundle.js"></script>
    <!-- endbuild -->
EOHTML;

    ?>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r73/three.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="background.js"></script>

    </body>
</html>