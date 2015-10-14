// I M P O R T
import React from 'react';
import ReactSwipe from 'react-swipe';
import classNames from 'classnames';

React.initializeTouchEvents(true);

const GalleryComponent = React.createClass({

  propTypes: {

      id: React.PropTypes.string,
      gallery: React.PropTypes.array,
      view: React.PropTypes.string,
      width: React.PropTypes.number,
      height: React.PropTypes.number

  },

  componentDidMount() {

    this.refs.carousel.swipe.slide( 0, 10 );

    window.addEventListener('keydown', this.handleOnKeyDown);
    window.addEventListener('keyup', this.handleOnKeyUp);

  },

  handleOnKeyUp(e) {

      React.findDOMNode(this.refs.arrowNext).classList.remove('pressed');
      React.findDOMNode(this.refs.arrowPrev).classList.remove('pressed');

  },
  handleOnKeyDown(e) {

    if (e.keyCode === 39)
    {
      React.findDOMNode(this.refs.arrowNext).classList.add('pressed');
      this.next();
    }
    else if (e.keyCode === 37)
    {
      React.findDOMNode(this.refs.arrowPrev).classList.add('pressed');
      this.prev();
    }

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
      gallery,
      width,
      height,
      view
    } = this.props;

    console.log('view = '+view);

    let panes = gallery.map(function (key, i) {

      let divStyle = {
        background: 'url(/assets/development/' + id + '/' + key + ') no-repeat center center',
        backgroundSize: 'contain',
        width: `${ width }rem`,
        height: `${ height }rem`
      };

      return (

        <div className={ `gallery-slide gallery-${ view }` } style={ divStyle } key={ i }>
        </div>

      );
    });

      return (
        <div
            className='component-gallery'
            style={{
              width: `${ width }rem`,
              height: `${ height }rem`
            }}>
          <ReactSwipe ref='carousel' className='swipe'>
            {panes}
          </ReactSwipe>
          <div
            ref='arrowPrev'
            className='arrow arrow-prev'
            onMouseDown={this.prev}
            onTouchStart={this.prev}>
            </div>
          <div
            ref='arrowNext'
            className='arrow arrow-next'
            onMouseDown={this.next}
            onTouchStart={this.next}>
            </div>
        </div>
      );

  }

});

export default GalleryComponent;