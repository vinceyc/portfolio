// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

// C O M P O N E N T S
import ButtonComponent from './../../../../general/button/Button.jsx';

// D A T A
import workData from './../../../../../data/work.js';

const GalleryComponent = React.createClass({

  getInitialState() {

        return {
            activeSlide: 0,
            isListView: false,
        };

    },

  propTypes: {

        idx: React.PropTypes.number,
        id: React.PropTypes.string,
        gallery: React.PropTypes.array,
        baseGridWidth: React.PropTypes.number,
        isMobile: React.PropTypes.bool,
        exitProject: React.PropTypes.func,
        nextProject: React.PropTypes.func,
        prevProject: React.PropTypes.func,

  },

  componentWillReceiveProps() {

    this.setState({ activeSlide: 0 });

  },

  handleOnKeyUp(e) {


  },
  handleOnKeyDown(e) {

    if (e.keyCode === 39)
    {
      if (React.findDOMNode(this.refs.arrowNext)) {
        this.next();
      }
    }
    else if (e.keyCode === 37)
    {
      if (React.findDOMNode(this.refs.arrowPrev)) {
        this.prev();
      }
    }

  },

  next() {

    let index = this.state.activeSlide;

    if (index === this.props.gallery.length-1) {
      this.setState({ activeSlide: 0 });
    } else {
      this.setState({ activeSlide: index+1 });
    }

  },

  prev() {

    let index = this.state.activeSlide;

    if (index === 0) {
      this.setState({ activeSlide: this.props.gallery.length-1 });
    } else {
      this.setState({ activeSlide: index-1 });
    }

  },

  render() {

    const {
      activeSlide,
      isListView
    } = this.state;

    const {
      id,
      idx,
      gallery,
      baseGridWidth,
      isMobile,
      exitProject,
      nextProject,
      prevProject
    } = this.props;

    const view  = workData[idx]['view'];
    let width;

    if ( view === 'phone' ) {
        width = isMobile ? baseGridWidth * 0.7 : baseGridWidth * 0.5;
    }
    if ( view === 'tablet' ) {
        width = baseGridWidth;
    }
    if ( view === 'desktop' ) {
        width = baseGridWidth * 1;
    }

      return (
        <div className='component-gallery'
            onMouseDown={this.next}
            style={{
                width: `${ width }rem`,
            }}>

            <div className='gallery-counter'>
                <div className='arrow arrow-prev'
                    onMouseDown={this.prev}>
                    &#10216;
                </div>
                <span className='gallery-counter-index'>{ activeSlide + 1 }</span>
                <span className='gallery-counter-length'>{ gallery.length }</span>
                <div className='arrow arrow-next'
                    onMouseDown={this.next}>
                    &#10217;
                </div>
            </div>

            <div className='gallery-carousel'
                onClick={this.nextProject}>
            { gallery.map((filename, i) => {

                const s1 = 40;
                const d1 = 20;

                const defaultSlideStyle = {
                    o: spring( 50, [s1, d1])
                };

                const SlideStyle = activeSlide === i ? {
                  o: spring(100, [s1, d1])
                } : {
                  o: spring(0, [s1, d1])
                };

                return (
                <Motion
                    key={ `${i}-${id}` }
                    defaultStyle={ defaultSlideStyle }
                    style={ SlideStyle }>
                    {({o}) => {
                    return (
                        <div
                        className={ `gallery-slide` }
                        style={{
                            opacity: `${ o/100 }`,
                        }}>
                        <img src={ `/assets/development/${id}/${filename}` } />
                        </div>
                    );
                    }}
                </Motion>
                );
                })}
            </div>

            <div className='project-nav'>
                <div className='project-nav-container'>
                    <span className='project-nav-prev'
                        onMouseDown={ prevProject }>
                        Previous Work
                    </span>
                    <span className='project-nav-thumbs'
                        onMouseDown={ exitProject }>
                        Thumbnails
                    </span>
                    <span className='project-nav-next'
                        onMouseDown={ nextProject }>
                        Next Work
                    </span>
                </div>
            </div>

        </div>
      );

  }

});

export default GalleryComponent;