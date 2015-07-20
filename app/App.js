var React = require('react');
var pixi = require('pixi.js');

var Stage = React.createClass({

  componentDidMount: function(){

        //Create the renderer
        var renderer = pixi.autoDetectRenderer( 350, 175 )

        //Add the canvas to the HTML document
        document.getElementById('stage').appendChild( renderer.view );

        //Create a container object called the `stage`
        var stage = new pixi.Container();

        //Tell the `renderer` to `render` the `stage`
        renderer.render( stage );

  },

  render: function(){

    return <div id="stage"></div>;
  }
});

React.render(<Stage />, document.getElementById('App'));