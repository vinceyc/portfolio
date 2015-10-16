// I M P O R T
import React from 'react';
import ReactSwipe from 'react-swipe';

React.initializeTouchEvents(true);

// C O M P O N E N T S
import ButtonComponent from './../../../../general/button/Button.jsx';

// D A T A
import workData from './../../../../../data/work.js';

const GalleryComponent = React.createClass({

  propTypes: {

      projectIndex: React.PropTypes.number,
      baseGridWidth: React.PropTypes.number,

  },

  componentWillRecieveProps() {

    console.log("gallery componentWillRecieveProps");
  },

  componentWillUnmount() {

    console.log("gallery componentWillUnmount");

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
      if (React.findDOMNode(this.refs.arrowNext)) {
        React.findDOMNode(this.refs.arrowNext).classList.add('pressed');
        this.next();
      }
    }
    else if (e.keyCode === 37)
    {
      if (React.findDOMNode(this.refs.arrowPrev)) {
        React.findDOMNode(this.refs.arrowPrev).classList.add('pressed');
        this.prev();
      }
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
      projectIndex,
      baseGridWidth
    } = this.props;

    const id      = workData[projectIndex]['id'];
    const gallery = workData[projectIndex]['gallery'];
    const view    = workData[projectIndex]['view'];
    let width;
    let height;

    if ( view === 'phone' ) {
        width = baseGridWidth;
        height = baseGridWidth/663*1177;
    }
    if ( view === 'tablet' ) {
        width = baseGridWidth;
        height = baseGridWidth/540*417;
    }
    if ( view === 'desktop' ) {
        width = baseGridWidth;
        height = baseGridWidth/540*417;
    }

    console.log('view = '+view);

      return (
        <div
            className='component-gallery'
            style={{
              width: `${ width }rem`,
              height: `${ height }rem`
            }}>
          <ReactSwipe ref='carousel' className='swipe'>
            { gallery.map((filename, i) => {

              const divStyle = {
                background: 'url(/assets/development/' + id + '/' + filename + ') no-repeat center center',
                backgroundSize: 'contain',
                width: `${ width }rem`,
                height: `${ height }rem`
              };

              return (
                <div
                  className={ `gallery-slide gallery-${ view }` }
                  style={ divStyle }
                  key={ i }>
                </div>
              );
            })}
          </ReactSwipe>

          <div
            ref='arrowPrev'
            className='arrow arrow-prev'
            onMouseDown={this.prev}
            onTouchStart={this.prev}>

            <ButtonComponent
              text={ 'next' }
              width={ 4 }
              height={ 2 }
              keycode={ 37 }
              isHeading={ false } />

          </div>

          <div
            ref='arrowNext'
            className='arrow arrow-next'
            onMouseDown={this.next}
            onTouchStart={this.next}>

            <ButtonComponent
              text={ 'prev' }
              width={ 4 }
              height={ 2 }
              keycode={ 39 }
              isHeading={ false } />

          </div>

        </div>
      );

  }

});

export default GalleryComponent;