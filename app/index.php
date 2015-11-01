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

    <script src="three.min.js"></script>
        <script type="x-shader/x-vertex" id="vertexshader">

            attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;

            void main() {

                vColor = customColor;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );
                gl_Position = projectionMatrix * mvPosition;

            }

        </script>

        <script type="x-shader/x-fragment" id="fragmentshader">

            uniform vec3 color;
            uniform sampler2D texture;
            varying vec3 vColor;

            void main() {

                gl_FragColor = vec4( color * vColor, 1.0 );
                gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
                if ( gl_FragColor.a < ALPHATEST ) discard;

            }

        </script>

        <script>
            var renderer, scene, camera;

            var particles, uniforms;

            var PARTICLE_SIZE = 10;

            init();
            animate();

            function init() {

                container = document.getElementById( 'container' );
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 350;


                var geometry1 = new THREE.BoxGeometry( 270, 270, 270, 30, 30, 30 );
                var vertices = geometry1.vertices;
                var positions = new Float32Array( vertices.length * 3 );
                var colors = new Float32Array( vertices.length * 3 );
                var sizes = new Float32Array( vertices.length );
                var vertex;
                var color = new THREE.Color();

                for ( var i = 0, l = vertices.length; i < l; i ++ ) {

                    vertex = vertices[ i ];
                    vertex.toArray( positions, i * 3 );
                    color.setHSL( 0, 0, 0.75 + 0.25 * ( i / l ))
                    color.toArray( colors, i * 3 );
                    sizes[ i ] = PARTICLE_SIZE;

                }

                var geometry = new THREE.BufferGeometry();
                geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
                geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
                geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

                //

                var material = new THREE.ShaderMaterial( {

                    uniforms: {
                        color:   { type: "c", value: new THREE.Color( 0xffffff ) },
                        texture: { type: "t", value: THREE.ImageUtils.loadTexture( "images/disc.png" ) }
                    },
                    vertexShader: document.getElementById( 'vertexshader' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                    alphaTest: 0.9,

                } );

                particles = new THREE.Points( geometry, material );
                scene.add( particles );

                renderer = new THREE.WebGLRenderer({ alpha: true });
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function animate() {

                requestAnimationFrame( animate );
                render();

            }

            function render() {

                particles.rotation.z += 0.001;
                particles.rotation.x -= 0.0005;
                particles.rotation.y -= 0.00025;

                var geometry = particles.geometry;
                var attributes = geometry.attributes;
                renderer.render( scene, camera );

            }
        </script>

    </body>
</html>