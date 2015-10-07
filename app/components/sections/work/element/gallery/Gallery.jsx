// I M P O R T
import React from 'react';
import ReactSwipe from 'react-swipe';
React.initializeTouchEvents(true);

const GalleryComponent = React.createClass({

  propTypes: {

      id: React.PropTypes.string,
      gallery: React.PropTypes.array

  },

  componentDidMount() {

    this.refs.carousel.swipe.slide( 0, 10 );
    console.log(this.props.id);

  },

  next() {

    this.refs.carousel.swipe.next();

  },

  prev() {

    this.refs.carousel.swipe.prev();

  },

  render() {

    const {
      id,
      gallery
    } = this.props;

     const cellStyle = {
        display: 'inline-block',
      };


    let panes = gallery.map(function (key, i) {

      let divStyle = {
        background: 'url(/assets/development/' + id + "/" + key + ") no-repeat center center",
        height: '400px',
        width: '300px'
      };

      return (

        <div className='gallery-slide' style={ divStyle } key={ i }></div>

      );
    });

      return (
        <div>
          <ReactSwipe ref='carousel' className='swipe'>
            {panes}
          </ReactSwipe>
          <div
            style={ cellStyle }
            onMouseDown={this.prev}
            onTouchStart={this.prev}>
            prev
            </div>
          <div
            style={ cellStyle }
            onMouseDown={this.next}
            onTouchStart={this.next}>
            next
            </div>
        </div>
      );

  }

});

export default GalleryComponent;