// I M P O R T
import React from 'react';

const Three = React.createClass({

    componentDidMount() {
        var renderer, scene, camera;

        var particles, uniforms;

        var PARTICLE_SIZE = 20;

        init();
        animate();

        function init() {

        container = document.getElementById( 'threejs' );

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 250;

        //

        var geometry1 = new THREE.BoxGeometry( 200, 200, 200, 16, 16, 16 );
        var vertices = geometry1.vertices;

        var positions = new Float32Array( vertices.length * 3 );
        var colors = new Float32Array( vertices.length * 3 );
        var sizes = new Float32Array( vertices.length );

        var vertex;
        var color = new THREE.Color();

        for ( var i = 0, l = vertices.length; i < l; i ++ ) {

            vertex = vertices[ i ];
            vertex.toArray( positions, i * 3 );

            color.setHSL( 0, 0, 0.25 + 0.5 * ( i / l ))
            color.toArray( colors, i * 3 );

            sizes[ i ] = PARTICLE_SIZE * 0.5;

        }

        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        //

        var material = new THREE.ShaderMaterial( {

            uniforms: {
                color:   { type: "c", value: new THREE.Color( 0xffffff ) },
                texture: { type: "t", value: THREE.ImageUtils.loadTexture( "textures/sprites/disc.png" ) }
            },
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

            alphaTest: 0.9,

        } );

        //

        particles = new THREE.Points( geometry, material );
        scene.add( particles );

        //

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

            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.001;

            var geometry = particles.geometry;
            var attributes = geometry.attributes;

            renderer.render( scene, camera );

        }
    },

    render() {
        return (
            <div id='threejs' className='component-background'></div>
        );
    },

});

export default Three;