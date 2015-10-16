// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import ProjectComponent from './element/project/Project.jsx';
import ThumbnailComponent from './element/thumbnail/Thumbnail.jsx';
import GalleryComponent from './element/gallery/Gallery.jsx';

// D A T A
import workData from './../../../data/work.js';

let workItems;
const projectArray = range(workData.length);

const WorkComponent = React.createClass({

  propTypes: {

    section: React.PropTypes.string,
    baseGridWidth: React.PropTypes.number

  },

  getInitialState() {
    return {
      mouse: [0, 0],
      firstConfig: [60,10],
      slider: {dragged: null, num: 0},
      lastPressed: [0, 0],
      projectIndex: 1,
    };
  },

  componentDidMount() {

        window.addEventListener('keydown', this.handleOnKeyDown);
        window.addEventListener('keyup', this.handleOnKeyUp);

      },

  handleOnKeyDown(e) {

      if (e.keyCode === 27)
      {
        this.setState({ projectIndex: null });
      }

  },

  handleTouchStart(i) {

      this.enterProject(i);

  },

  handleMouseDown(i) {

      this.enterProject(i);

  },

  enterProject(i) {
      if (typeof(i) == 'number') {
        this.setState({ projectIndex: i });
      } else {
        console.log("not a number");
      }
  },

  exitProject() {
      this.setState({ projectIndex: null });
  },


   render() {
    const {
      mouse,
      lastPressed,
      firstConfig: [s0, d0],
      slider: {dragged, num},
      projectIndex
    } = this.state;

    const {
      section,
      baseGridWidth
    } = this.props;

    let renderedProject;
    let renderedGallery;

    if (projectIndex !== null) {
      renderedProject = <ProjectComponent
        projectIndex={ projectIndex }
        exitProject={ this.exitProject }
        view={ workData[projectIndex]['view'] }
        baseGridWidth={ baseGridWidth } />;

      renderedGallery = <GalleryComponent
        projectIndex={ projectIndex }
        baseGridWidth={ baseGridWidth } />;
    }

    const projectStyle = projectIndex == null
    ? {
        x: spring( -500 , [s0, d0]),
        y: spring( -1200 , [s0, d0]),
        o: spring( 0 , [20, d0]),
      }
    : {
        x: spring( 0, [s0, d0]),
        y: spring( 0, [s0, d0]),
        o: spring( 100 ),
      };

    return (
      <section
        className='section component-work column'
        style={{
          width: `${ (baseGridWidth * 3) + 3 }rem`,
        }}>
        <Motion style={ projectStyle }>
          {({x, y, o}) =>
            <div
              style={{
                opacity: o/100,
                transform: `translate3d(${x}px, ${y}px, 0)`,
                WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              }}>
              { renderedProject }
              { renderedGallery }
            </div>
          }
        </Motion>

        <div className={(projectIndex !== null) ? 'thumbnail-gallery project-view' : 'thumbnail-gallery'}>
          { projectArray.map((row, i) => {
              const cellStyle = {
                width: `${ baseGridWidth }rem`,
                height: `${ baseGridWidth*4/3 }rem`
              };
              const stiffness = s0 + i * 30;
              const damping = d0 + i * 2;
              const motionStyle = projectIndex !== null
                ? {
                    x: spring(0, [stiffness, damping]),
                    y: spring(0, [stiffness, damping]),
                  }
                : {
                    x: spring(0, [stiffness, damping]),
                    y: spring(0, [stiffness, damping]),
                  };

              return (
                <div
                  key={ i }
                  style={ cellStyle }
                  onMouseDown={this.handleMouseDown.bind(null, i)}
                  onTouchStart={this.handleTouchStart.bind(null, i)}
                  className="thumbnail-cell">
                  <Motion
                    defaultStyle={{ x: 1000, y: 0 }}
                    style={ motionStyle }>
                    {({x, y}) => {

                      return (
                        <div
                          className="thumbnail-wrapper"
                          style={{
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                          }}
                          >
                          <ThumbnailComponent
                            key={ i }
                            data={ workData[i] }
                            active={ projectIndex===i ? true : false }
                            baseGridWidth={ baseGridWidth } />
                        </div>
                      );
                    }}
                  </Motion>
                </div>
              );
          })}
        </div>
      </section>
    );
  },
});

export default WorkComponent;