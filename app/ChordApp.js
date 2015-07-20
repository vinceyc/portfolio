var React = require('react');
window.React = React;

var ChordApp = React.createClass({
  getInitialState: function(){
    return {
      players: ['G'],
      actualKey: 'G',
      keyOptions: ["G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb"]
    }
  },
  componentWillMount: function(){
    this.setState({
        actualKeyIndex: this.state.keyOptions.indexOf(this.state.actualKey)
     });
    console.log("length of players "+this.state.players.length);
  },
  changeKey: function(e){
    this.setState({
        actualKey: e.target.value,
        actualKeyIndex: this.state.keyOptions.indexOf(e.target.value)
     });
    console.log("original key changed");
  },
  deletePlayer: function(){
    console.log("close this player");
    console.log(i);
  },
 handleClick: function(){
    var bandLength = this.state.players.length;
    this.state.players[bandLength] = 'G';
    console.log(this.state.players);
    this.setState({
      players: this.state.players
    });
  },
  render: function(){
    var band = [];

    for (var i=0; i<(this.state.players.length); i++) {
      band.push(<Player
        actualKeyIndex={this.state.actualKeyIndex} playerIndex={i} playerKey={this.state.players[i]} keyOptions={this.state.keyOptions} deleteHandler={this.deletePlayer} />);
    }

    return (
      <div>
        <h1>Key of
          <select onChange={this.changeKey}>
            {this.state.keyOptions.map(function(key, i){
              return <option className={i}> {key} </option>;
            })}
          </select>
        </h1>
        <hr />

        <button onClick={this.handleClick}>Add Player</button>
        <div id="band">
          {band}
        </div>
      </div>
    )
  }
});

var Player = React.createClass({
  getInitialState: function(){
    return {
      keyOptions: this.props.keyOptions,
      playerKey: this.props.playerKey,
      playerIndex: this.props.playerIndex,
      capoNumber: 0,
      chordSystem: [
          ['G','Am','Bm','C','D','Em','F#dim'],
          ['Ab','Bbm','Cm','Db','Eb','Fm','Gdim'],
          ['A','Bm','C#m','D','E','F#m','G#dim'],
          ['Bb','Cm','Dm','Eb','F','Gm','Adim'],
          ['B','C#m','D#m','E','F#','G#m','Adim'],
          ['C','Dm','Em','F','G','Am','Bdim'],
          ['Db','Ebm','Fm','Gb','Ab','Bbm','Cdim'],
          ['D','Em','F#m','G','A','Bm','C#dim'],
          ['Eb','Fm','Gm','Ab','Bb','Cm','Ddim'],
          ['E','F#m','G#m','A','B','C#m','D#dim'],
          ['F','Gm','Am','Bb','C','Dm','Edim'],
          ['Gb','Abm','Bbm','C','Db','Ebm','Fdim']
       ]
    }
  },
  changeKey: function(e){
     this.setState({
        chordKey: e.target.value,
        capoNumber: this.props.keyOptions.indexOf(e.target.value)
     });
  },
  render: function(){
    var capoShown;
    if (this.props.actualKeyIndex-this.state.capoNumber == 0) {
      capoShown = "No capo";
    }
    else if (this.props.actualKeyIndex<this.state.capoNumber) {
      capoShown = "Capo "+(-(this.props.actualKeyIndex-this.state.capoNumber));
    } else {
      capoShown = "Capo "+(11-(this.props.actualKeyIndex-this.state.capoNumber));
    }

    return (
      <div className="chord-group">
        <h4>Playing chords in Key of
          <select onChange={this.changeKey}>
              {this.props.keyOptions.map(function(item) {
                 return <option key={item.id}> {item} </option>;
              })}
          </select>
        </h4>
        <p onClick={this.props.deleteHandler}>&times;</p>
        <p>{capoShown}</p>

        <ChordsOfKey chordSystem={this.state.chordSystem} chordKey={this.state.chordKey} />
      </div>
    )
  }
});

var ChordChart = React.createClass({
  render: function(){
    return (
      <div className="chord-single" >
        {this.props.chordName}
        <div className={this.props.chordPosition}></div>
      </div>
    )
  }
});


 var ChordsOfKey = React.createClass({
  handleClick: function(){
    alert("show chord chart");

     var dataset = [ 1, 2, 3, 4, 5, 3 ];
     d3.selectAll(".chord")
      .data(dataset)
      .enter()
      .append("div")
      .attr("class", "bar")
      .append("span")
      .attr("class", "note")
      .style("top", function(d) {
          var noteHeight = (d) * 20;
          return noteHeight + "%";
      });
  },
  render: function(){

    var chordKey = this.props.chordKey;
    var chordSystem = this.props.chordSystem;
    var currentChords = [];

    var listChords = chordSystem.map(function(key, i){
        if (chordSystem[i][0] == chordKey) {
          for (var k=0; k<chordSystem[i].length; k++) {
            currentChords.push(chordSystem[i][k]);
          }
        }
    });

    var listCurrentChords = currentChords.map(function(chord, i){
      return (
        <ChordChart onClick={this.handleClick} key={i} chordPosition={i} chordName={chord} />
      );
    });

    return (
      <div className="chords-list">
        {listCurrentChords}
      </div>
    )
  }
});

React.render(<ChordApp />, document.getElementById('app'));