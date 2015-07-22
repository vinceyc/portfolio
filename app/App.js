var React = require('react');
var PIXI = require('pixi.js');

var Container           = PIXI.Container;
var ParticleContainer           = PIXI.ParticleContainer;
var autoDetectRenderer  = PIXI.autoDetectRenderer;
var loader              = PIXI.loader;
var Sprite              = PIXI.Sprite;
var TextureCache        = PIXI.TextureCache;
var Rectangle           = PIXI.Rectangle;

var Stage = React.createClass({

  componentDidMount: function(){

      //Create the renderer
      var renderer = autoDetectRenderer(

        500, 500,
        {antialiasing: false, transparent: false, resolution: 1}

      );

      document.getElementById('stage').appendChild( renderer.view );
      var stage = new Container();

      loader
        .add([
          {url: "images/grimer1.png"},
          {url: "images/mog_map.json"}
        ])
        .on("progress", onProgress)
        .load(setup);

      function keyboard(keyCode) {
          var key = {};
          key.code = keyCode;
          key.isDown = false;
          key.isUp = true;
          key.press = undefined;
          key.release = undefined;
          //The `downHandler`
          key.downHandler = function(event) {
            if (event.keyCode === key.code) {
              if (key.isUp && key.press) key.press();
              key.isDown = true;
              key.isUp = false;
            }
            event.preventDefault();
          };

          //The `upHandler`
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
            "keydown", key.downHandler.bind(key), false
          );
          window.addEventListener(
            "keyup", key.upHandler.bind(key), false
          );
          return key;
      }

      function onProgress( loader, resource ) {

          console.log("loading: " + resource.url);
          console.log("progress: " + loader.progress + "%");

      }

      var mog, state, animationState;
      var direction = "left";

      var animationStates = [
        "standing",
        "walking_1",
        "walking_2",
        "crying_1",
        "crying_2",
        "jump",
        "midair",
        "fall",
        "hurt",
        "dead"
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

      function setup() {

          // Mog

          mog = new Container();
          var standing = new Sprite.fromFrame("moggle_01.png");
          var walking_1 = new Sprite.fromFrame("moggle_02.png");
          var walking_2 = new Sprite.fromFrame("moggle_03.png");
          var crying_1 = new Sprite.fromFrame("moggle_04.png");
          var crying_2 = new Sprite.fromFrame("moggle_05.png");
          var jump = new Sprite.fromFrame("moggle_06.png");
          var midair = new Sprite.fromFrame("moggle_07.png");
          var fall = new Sprite.fromFrame("moggle_08.png");
          var hurt = new Sprite.fromFrame("moggle_09.png");
          var dead = new Sprite.fromFrame("moggle_10.png");
          hurt.position.set(-3, 13);
          dead.position.set(-12, 26);

          mog.addChild(standing);
          mog.addChild(walking_1);
          mog.addChild(walking_2);
          mog.addChild(crying_1);
          mog.addChild(crying_2);
          mog.addChild(jump);
          mog.addChild(midair);
          mog.addChild(fall);
          mog.addChild(hurt);
          mog.addChild(dead);

          var div = document.getElementById('stage');

          mog.scale.set(1.2, 1.2);
          mog.y = div.clientHeight*0.5 - mog.height*0.5;
          mog.x = div.clientHeight*0.5 - mog.width*0.5;
          mog.vx = 0;
          mog.vy = 0;

          stage.addChild(mog);

          animationSetState("standing");

          var left = keyboard(37),
              up = keyboard(38),
              right = keyboard(39),
              down = keyboard(40);

          var walking;

          //Left arrow key `press` method
          left.press = function() {

            //Change the mog's velocity when the key is pressed
            mog.vx = -5;
            mog.vy = 0;

            if (direction !== "left") {
              direction = "left";
              mog.scale.x = 1; // flip horizontal
            }

            clearInterval(walking);

            walking = setInterval(function(){

              if (animationState === "walking_1") {
                animationSetState("walking_2");
                animationState = "walking_2";
              } else {
                animationSetState("walking_1");
                animationState = "walking_1";
              }

              console.log("walking");

            }, 150);

          };

          //Left arrow key `release` method
          left.release = function() {

            //If the left arrow has been released, and the right arrow isn't down,
            //and the mog isn't moving vertically:
            //Stop the mog
            if (!right.isDown && mog.vy === 0) {
              mog.vx = 0;
            }

            clearInterval(walking);
            animationSetState("standing");

          };

          //Up
          up.press = function() {
            // mog.vy = -5;
            // mog.vx = 0;

            mog.vy = 0;
            mog.vx = 0;

            animationSetState("jump");
            jumpLoop(mog.getGlobalPosition().y);

          };
          up.release = function() {
            if (!down.isDown && mog.vx === 0) {
              mog.vy = 0;
            }
          };

          //Right
          right.press = function() {
            mog.vx = 5;
            mog.vy = 0;


            if (direction !== "right") {
              direction = "right";
              mog.scale.x = -1; // flip horizontal
            }

            clearInterval(walking);

            walking = setInterval(function(){

              if (animationState === "walking_1") {
                animationSetState("walking_2");
                animationState = "walking_2";
              } else {
                animationSetState("walking_1");
                animationState = "walking_1";
              }

              console.log("walking");

            }, 150);

          };
          right.release = function() {
            if (!left.isDown && mog.vy === 0) {
              mog.vx = 0;
            }

            clearInterval(walking);
            animationSetState("standing");

          };

          //Down
          down.press = function() {
            // mog.vy = 5;
            // mog.vx = 0;

            mog.vy = 0;
            mog.vx = 0;

            animationSetState("hurt");
          };
          down.release = function() {
            if (!up.isDown && mog.vx === 0) {
              mog.vy = 0;
            }
            animationSetState("standing");
          };

          // Grimer

          var grimer = new Sprite.fromImage("images/grimer1.png");

          grimer.position.set(100, 100);
          grimer.scale.set(1.5, 1.5);
          grimer.anchor.set(1, 1);

          stage.addChild(grimer);

          state = play;

          gameLoop();
      }

      function jumpLoop(height){

          console.log("code for one jump here");
          console.log(height);

      }

      function gameLoop(){

          requestAnimationFrame(gameLoop);
          state();
          renderer.render(stage);

      }

      function play() {

            mog.x += mog.vx;
            mog.y += mog.vy;

      }
  },

  render: function(){

    return <div id="stage"></div>;
  }
});

React.render(<Stage />, document.getElementById('App'));