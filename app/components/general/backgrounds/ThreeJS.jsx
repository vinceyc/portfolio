// I M P O R T
import React from 'react';

const ThreeJS = React.createClass({

    componentDidMount() {
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer({ alpha: true });
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMap.enabled = true;

        // position and point the camera to the center of the scene
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 60;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        var container = document.getElementById('wrapper');
        container.appendChild(webGLRenderer.domElement);

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchend', onDocumentTouchEnd, false );

        function onDocumentMouseDown( event ) { controls.isPressed = true }
        function onDocumentTouchStart( event ) { controls.isPressed = true }
        function onDocumentMouseUp( event ) { controls.isPressed = false }
        function onDocumentTouchEnd( event ) { controls.isPressed = false }

        // call the render function
        var step = 0;

        var knot;

        var controls = new function () {
            // we need the first child, since it's a multimaterial
            this.radialSegments = 400;
            this.tubularSegments = 4;
            this.p = 7;
            this.pMin = 7;
            this.q = 3;
            this.qMin = 3;
            this.heightScale = 1.5;
            this.asParticles = true;
            this.rotate = false;
            this.isPressed = false;

            this.animationVelocity = 0.1;

            this.pressDuration = 15;
            this.pressDurationMax = 15;

            this.radius = 5;
            this.radiusMin = 5;
            this.radiusMax = 10;

            this.tube = 1;
            this.tubeMin = 1;
            this.tubeMax = 10;

            this.redraw = function () {
                // remove the old plane
                if (knot) scene.remove(knot);
                // create a new one
                var geom = new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q), controls.heightScale);

                if (controls.asParticles) {
                    knot = createPointCloud(geom);
                } else {
                    knot = createMesh(geom);
                }

                // add it to the scene.
                var randomNumber = Math.floor(Math.random() * 5);
                console.log('[randomNumber] '+randomNumber);
                controls.p = Math.floor(Math.random() * 10) + 1  ;
                controls.q = Math.floor(Math.random() * 10) + 1  ;
                console.log('controls.p '+controls.p);
                console.log('controls.q '+controls.q);
                console.log('controls.radius '+controls.radius);
                console.log('controls.radialSegments '+controls.radialSegments);
                console.log('controls.tubularSegments '+controls.tubularSegments);
                console.log('controls.tube '+controls.tube);
                scene.add(knot);
            };

        }

        controls.redraw();
        render();

        // from THREE.js examples
        function generateSprite() {

            var canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;

            var context = canvas.getContext('2d');
            var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.1, 'rgba(0,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(0,0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');

            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;

        }

        function createPointCloud(geom) {
            var material = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 3,
                transparent: true,
                blending: THREE.AdditiveBlending,
                map: generateSprite()
            });

            var system = new THREE.Points(geom, material);
            system.sortParticles = true;
            return system;
        }

        function createMesh(geom) {

            // assign two materials
            var meshMaterial = new THREE.MeshNormalMaterial({});
            meshMaterial.side = THREE.DoubleSide;

            // create a multimaterial
            var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

            return mesh;
        }



        function expand() {

            controls.tube = step;
            controls.radius = step;

            if (controls.tube < controls.tubeMax) {
                controls.tube = step += controls.animationVelocity;
            }
            if (controls.radius < controls.radiusMax) {
                controls.radius = step += controls.animationVelocity;
            }
            if (controls.tube < controls.tubeMax || controls.radius < controls.radiusMax) {
                controls.redraw();
            }

        }

        function compress() {
            if (controls.tube > controls.tubeMin) {
                controls.tube = step -= controls.animationVelocity;
                controls.redraw();
            } else {
                controls.tube = controls.tubeMin;
            }
            if (controls.radius > controls.radiusMin) {
                controls.radius = step -= controls.animationVelocity;
                controls.redraw();
            } else {
                controls.radius = controls.radiusMin;
            }
            if (controls.tube < controls.tubeMin || controls.radius < controls.radiusMin) {
                controls.redraw();
            }
        }

        function render() {

            if (controls.isPressed) {

                if (controls.pressDuration < controls.pressDurationMax) {

                    controls.pressDuration++;
                    knot.rotation.z = step;
                    compress();

                }

                knot.rotation.z = step += controls.pressDuration/500;

            } else {

                if (controls.pressDuration > 0 ) {

                    expand();
                    controls.pressDuration--;

                }

                knot.rotation.z = step += controls.pressDuration/500;
                // knot.rotation.x = step += 0.001;

            }

            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }
    },

    render() {
        return (
            <div id='WebGL-output'>

            </div>
        );
    },

});

export default ThreeJS;