// I M P O R T
import React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import ProjectComponent from './element/project/Project.jsx';
import ThumbnailComponent from './element/thumbnail/Thumbnail.jsx';

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
      firstConfig: [60, 5],
      lastPressed: [0, 0],
      projectIndex: null
    }
  },

  componentDidMount() { 
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('touchstart', this.handleTouchStart);
  },

  handleTouchStart(i) {
    this.enterProject(i);
  },

  handleMouseDown(i) {
      this.enterProject(i);
  },

  enterProject(i) {
      this.setState({
        projectIndex: i
      });
  },

  exitProject() {
    console.log('exit');

      this.setState({
        projectIndex: null,
      });
  },

  render() {

    const {
      mouse,
      isPressed,
      lastPressed,
      projectIndex,
      firstConfig: [s0, d0],
      exitProject
    } = this.state;

    const {
      section,
      baseGridWidth
    } = this.props;

    let renderedSection;

    if (projectIndex !== null) {

      renderedSection = <ProjectComponent
        data={ workData[ projectIndex ] }
        exitProject={ this.exitProject }
        baseGridWidth={ baseGridWidth } />;

    }

    const projectStyle = projectIndex == null
      ? {
          x: spring( -700 , [s0, d0]),
          y: spring( 0 , [s0, d0]),
          o: spring( 0 , [s0, d0]),
        }
      : {
          x: spring( -325, [s0, d0]),
          y: spring( -325, [s0, d0]),
          o: spring( 1, [s0, d0]),
        };

    return (
      <section className='section component-work'>
        <Motion style={ projectStyle }>
          {({x, y, o}) =>
            <div
              style={{
                opacity: o,
                transform: `translate3d(${x}px, ${y}px, 0)`,
                WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              }}>
              { renderedSection }
            </div>
          }
        </Motion>
        <div className={(projectIndex !== null) ? 'thumbnail-gallery project-view' : 'thumbnail-gallery'}>
          {projectArray.map((row, i) => {
              const stiffness = s0 + (i * 30);
              const damping = d0 + (i * 2);
              const motionStyle = projectIndex == null
              ? {
                  x: spring( 0 , [stiffness, damping]),
                  y: spring( 0 , [stiffness, damping]),
                }
              : {
                  x: spring( -325, [stiffness, damping]),
                  y: spring( -325, [stiffness, damping]),
                };

              return (
                 <StaggeredMotion
                  defaultStyles={
                    x: spring( 0 , [stiffness, damping]),
                    y: spring( 0 , [stiffness, damping]),
                  }
                  style={ motionStyle }
                  key={ i }>
                  {({x, y}) => {

                    return (
                        <div className='thumbnail-cell'
                          onMouseDown={this.handleMouseDown.bind(null, i, [x, y])}
                          onTouchStart={this.handleTouchStart.bind(null, i, [x, y])}
                          style={{
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                            width: `${ baseGridWidth }rem`
                          }}>

                           <ThumbnailComponent
                            key={ i }
                            data={ workData[i] }
                            baseGridWidth={ baseGridWidth } />

                        </div>
                      );
                  }}
                </StaggeredMotion>
              );
          })}
        </div>
        {renderedSection}
      </section>
    );
  }
});

export default WorkComponent;
