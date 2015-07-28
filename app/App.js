var React = require('react');
var PIXI = require('pixi.js');

var Container           = PIXI.Container;
var ParticleContainer   = PIXI.ParticleContainer;
var autoDetectRenderer  = PIXI.autoDetectRenderer;
var loader              = PIXI.loader;
var Sprite              = PIXI.Sprite;
var Rectangle           = PIXI.Rectangle;
var extras              = PIXI.extras;
var TilingSprite        = extras.TilingSprite;
var utils               = PIXI.utils;
var TextureCache        = utils.TextureCache;

var Stage = React.createClass({

  componentDidMount: function(){
      var stageHeight =  document.getElementById('stage').innerHeight;
      var stageWidth =  document.getElementById('stage').innerWidth;

      //Create the renderer
      var renderer = autoDetectRenderer(

        stageWidth, stageHeight,
        {antialiasing: false, transparent: true, resolution: 1}

      );

      document.getElementById('stage').appendChild( renderer.view );
      var stage = new Container();

      loader
        .add([
          {url: 'images/grimer1.png'},
          {url: 'images/bridge.png'},
          {url: 'images/mog_map.json'}
        ])
        .on('progress', onProgress)
        .load(setup);

      function keyboard(keyCode) {
          var key = {};
          key.code = keyCode;
          key.isDown = false;
          key.isUp = true;
          key.press = undefined;
          key.release = undefined;

          key.downHandler = function(event) {

              if (event.keyCode === key.code) {

                  if (key.isUp && key.press) key.press();
                  key.isDown = true;
                  key.isUp = false;

              }

              event.preventDefault();

          };

          key.upHandler = function(event) {

              if (event.keyCode === key.code) {

                  if (key.isDown && key.release) key.release();
                  key.isDown = false;
                  key.isUp = true;

              }

              event.preventDefault();

          };

          //Attach event listeners
          window.addEventListener(
            'keydown', key.downHandler.bind(key), false
          );
          window.addEventListener(
            'keyup', key.upHandler.bind(key), false
          );
          return key;
      }

      function onProgress( loader, resource ) {

          // console.log('loading: ' + resource.url);
          // console.log('progress: ' + loader.progress + '%');

      }

      //Sprite Containers
      var mog;
      var grimer;
      var bridge;
      var bridgeTile;

      // Initial Variables
      var state;
      var animationState;
      var direction = 'left';
      var walkingLeftLoop;
      var walkingRightLoop;
      var somersaultLoop;
      var jumpingLoop;
      var originalLoopSpeed = 75;
      var loopSpeed = originalLoopSpeed;
      var originalMoveSpeed = 3;
      var moveSpeed = originalMoveSpeed;
      var jumpHeight = 120;
      var midJump = false;
      var midSomersault = false;
      var div = document.getElementById('stage');
      var defaultHeight = (div.clientHeight-120);

      var animationStates = [

          'standing',
          'walking_1',
          'walking_2',
          'crying_1',
          'crying_2',
          'jumping_1',
          'jumping_2',
          'fall',
          'hurt',
          'dead'

      ];

      function animationSetState(state) {
        for (i = 0; i < mog.children.length; i++) {
            if (animationStates[i] === state) {
              mog.children[i].visible = true;
            } else {
              mog.children[i].visible = false;
            }
          }
      }

      function contain(sprite, container) {

            var collision = undefined;

            //Left
            if (sprite.x < container.x) {
              sprite.x = container.x;
              collision = "left";
              console.log(collision);
            }

            //Top
            if (sprite.y < container.y) {
              sprite.y = container.y;
              collision = "top";
            }

            //Right
            if (sprite.x > container.width - sprite.width ) {
              sprite.x = container.width - sprite.width;
              collision = "right";
              console.log(collision);
            }

            //Bottom
            if (sprite.y + sprite.height > container.height) {
              sprite.y = container.height - sprite.height;
              collision = "bottom";
            }

            //Return the `collision` value
            return collision;
            console.log(collision);
          }

      function setup() {

          bridge = new Sprite.fromImage('images/bridge.png');
          // bridgeTile = new TilingSprite(bridge, 100, 20);

          // Grimer
          grimer = new Container();

          var grimerStanding = new Sprite.fromImage('images/grimer1.png');

          grimer.addChild(grimerStanding);

          grimer.y = defaultHeight;
          grimer.x = div.clientHeight*0.5 - grimer.width*0.5;

          // Mog
          mog = new Container();
          var standing = new Sprite.fromFrame('moggle_01.png');
          var walking_1 = new Sprite.fromFrame('moggle_02.png');
          var walking_2 = new Sprite.fromFrame('moggle_03.png');
          var crying_1 = new Sprite.fromFrame('moggle_04.png');
          var crying_2 = new Sprite.fromFrame('moggle_05.png');
          var jumping_1 = new Sprite.fromFrame('moggle_06.png');
          var jumping_2 = new Sprite.fromFrame('moggle_07.png');
          var fall = new Sprite.fromFrame('moggle_08.png');
          var hurt = new Sprite.fromFrame('moggle_09.png');
          var dead = new Sprite.fromFrame('moggle_10.png');

          hurt.position.set(-3, 13);
          dead.position.set(-12, 26);

          mog.addChild(standing);
          mog.addChild(walking_1);
          mog.addChild(walking_2);
          mog.addChild(crying_1);
          mog.addChild(crying_2);
          mog.addChild(jumping_1);
          mog.addChild(jumping_2);
          mog.addChild(fall);
          mog.addChild(hurt);
          mog.addChild(dead);

          mog.scale.set(1.5, 1.5);
          mog.y = defaultHeight;
          mog.x = div.clientHeight*0.5 - mog.width*0.5;
          mog.vx = 0;
          mog.vy = 0;

          mog.pivot.set(12, 30);

          stage.addChild(grimer);
          stage.addChild(mog);

          bridge.position.set(0, 345);
          stage.addChild(bridge);

          animationSetState('standing');

          var left = keyboard(37),
              up = keyboard(38),
              right = keyboard(39),
              down = keyboard(40),
              spacebar = keyboard(32);

          left.press = function() {

              mog.vx = -moveSpeed;

              if (direction !== 'left') {
                direction = 'left';
                mog.scale.x = 1.5;
              }

              startWalkingLeft();

              // console.log('left pressed');

          };

          left.release = function() {

              if (!right.isDown && mog.vy === 0) mog.vx = 0;
              stopWalkingLeft();
              animationSetState('standing');

              // console.log('left released');

          };

          up.press = function() {

              mog.vy = -moveSpeed;

              if (!midJump) {

                  startJumping();

              } else {

                  console.log('in mid-jump');

              }

              // console.log('up pressed');

          };

          up.release = function() {

              descendJump();
              // console.log('up released');

          };

          right.press = function() {

              mog.vx = moveSpeed;

              if (direction !== 'right') {
                direction = 'right';
                mog.scale.x = -1.5; // flip horizontal
              }
              startWalkingRight();

              // console.log('right pressed');

          };

          right.release = function() {

              if (!left.isDown && mog.vy === 0) mog.vx = 0;
              stopWalkingRight();
              animationSetState('standing');

              // console.log('right released');

          };

          //Down
          down.press = function() {

              mog.vy = 0;
              mog.vx = 0;
              animationSetState('hurt');

              // console.log('down pressed');

          };

          down.release = function() {

              animationSetState('standing');

              // console.log('down released');

          };

          spacebar.press = function() {

              if (midJump && !midSomersault) {

                  midSomersault= true;

                  if (direction === 'left') mog.rotation = 1*Math.PI;

                  somersault( direction )

              } else {

                  console.log('in mid-jump');

              }

          };

          spacebar.release = function() {


          };

          state = play;

          gameLoop();
      }

      function resetSpeed() {

          loopSpeed = originalLoopSpeed;
          moveSpeed = originalMoveSpeed;

      }

      function startWalkingLeft() {

          stopWalkingRight();

          walkingLeftLoop = setInterval(function(){

              if (animationState === 'walking_1' && midJump === false) {
                animationSetState('walking_2');
                animationState = 'walking_2';
              } else {
                animationSetState('walking_1');
                animationState = 'walking_1';
              }

          }, loopSpeed);

      }

      function startWalkingRight() {

          stopWalkingLeft();

          walkingRightLoop = setInterval(function(){

              if (animationState === 'walking_1' && midJump === false) {
                animationSetState('walking_2');
                animationState = 'walking_2';
              } else {
                animationSetState('walking_1');
                animationState = 'walking_1';
              }

          }, loopSpeed);

      }

      function stopWalkingLeft() {

          clearInterval(walkingLeftLoop);
          resetSpeed();

      }

      function stopWalkingRight() {

          clearInterval(walkingRightLoop);
          resetSpeed();

      }

      function startJumping() {

          clearInterval(jumpingLoop);
          midJump = true;
          mog.y = defaultHeight;

          jumpingLoop = setInterval(function(){

              if (animationState === 'jumping_1') {

                  animationSetState('jumping_2');
                  animationState = 'jumping_2';

              } else {

                  animationSetState('jumping_1');
                  animationState = 'jumping_1';
              }

              var limit = defaultHeight-jumpHeight;

              if (mog.y < limit) {

                  descendJump();

              }

          }, loopSpeed);

      }

      function descendJump() {

          resetSpeed();

          clearInterval(jumpingLoop);
          jumpingLoop = setInterval(function(){

          animationSetState('fall');

            if (mog.y < defaultHeight) {

                mog.vy = moveSpeed;

            } else {

                clearInterval(jumpingLoop);
                animationSetState('dead');
                mog.y = defaultHeight;
                mog.vy = 0;
                midJump = false;
            }

          }, loopSpeed);

      }

      function stopJumping() {

          clearInterval(jumpingLoop);
          resetSpeed();

      }

      function somersault( flipDirection ) {

          if ( midSomersault ) {

              if (flipDirection === 'left') {

                  if ( mog.rotation > 0 ) {

                      requestAnimationFrame( somersault );
                      mog.rotation = mog.rotation - 0.4;

                  for (i = 360; i > 0; i++) {
                      //ignore for now
                  }

                  } else {

                      cancelAnimationFrame( somersault );
                      mog.rotation = 0;
                      midSomersault = false;

                  }

              } else {

                   if ( mog.rotation < 2*Math.PI ) {

                      requestAnimationFrame( somersault );
                      mog.rotation = mog.rotation + 0.4;
                      console.log(mog.rotation);

                  } else {

                      cancelAnimationFrame( somersault );
                      mog.rotation = 0;
                      midSomersault = false;

                  }

              }

          }

      }

      function detectCollision(r1, r2) {

          //Define the variables we'll need to calculate
          var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

          //hit will determine whether there's a collision
          hit = false;

          //Find the center points of each sprite
          r1.centerX = r1.x + r1.width / 2;
          r1.centerY = r1.y + r1.height / 2;
          r2.centerX = r2.x + r2.width / 2;
          r2.centerY = r2.y + r2.height / 2;

          //Find the half-widths and half-heights of each sprite
          r1.halfWidth = r1.width / 2;
          r1.halfHeight = r1.height / 2;
          r2.halfWidth = r2.width / 2;
          r2.halfHeight = r2.height / 2;

          //Calculate the distance vector between the sprites
          vx = r1.centerX - r2.centerX;
          vy = r1.centerY - r2.centerY;

          var collisionProximity = 1;

          //Figure out the combined half-widths and half-heights
          combinedHalfWidths = (r1.halfWidth + r2.halfWidth)*collisionProximity;
          combinedHalfHeights = (r1.halfHeight + r2.halfHeight)*collisionProximity;

          //Check for a collision on the x axis
          if (Math.abs(vx) < combinedHalfWidths) {

            //A collision might be occuring. Check for a collision on the y axis
            if (Math.abs(vy) < combinedHalfHeights) {

              //There's definitely a collision happening
              hit = true;

            } else {

              //There's no collision on the y axis
              hit = false;

            }
          } else {

            //There's no collision on the x axis
            hit = false;

          }

          //`hit` will be either `true` or `false`
          return hit;

      };

      function gameLoop(){

          requestAnimationFrame(gameLoop);
          state();
          contain(mog, {x: 0, y: 0,
            width: 768,
            height: 456});
          renderer.render(stage);

      }

      function play() {

            mog.x += mog.vx;
            mog.y += mog.vy;


            if (detectCollision(mog, grimer)) {


            } else {

            }

      }

  },

  render: function(){

      return <div id='stage'></div>;

  }

});

React.render(<Stage />, document.getElementById('App'));