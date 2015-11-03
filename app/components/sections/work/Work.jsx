// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import ProjectComponent from './element/project/Project.jsx';
import ThumbnailComponent from './element/thumbnail/Thumbnail.jsx';
import GalleryComponent from './element/gallery/Gallery.jsx';
import ViewportComponent from './element/viewport/Viewport.jsx';

// D A T A
import workData from './../../../data/work.js';

let workItems;
const projectArray = range(workData.length);

const WorkComponent = React.createClass({

    propTypes: {

        baseGridWidth: React.PropTypes.number,
        columns: React.PropTypes.number,
        isMobile: React.PropTypes.bool,

    },

    getInitialState() {
        return {
            firstConfig: [80, 25],
            idx: null
        };
    },

    handleOnKeyDown(e) {

        if (e.keyCode === 27)
        { this.setState({ idx: null }) }

    },

    handleTouchStart(i) {

        this.enterProject(i);

    },

    handleMouseDown(i) {

        this.enterProject(i);

    },

    enterProject(i) {

        if (typeof(i) == 'number') {
            this.setState({ idx: i });
        }
        document.getElementById('App').style.scrollTop = 0;

    },

    exitProject() {
        this.setState({
            idx: null
        });
    },

    nextProject() {

        let currentIdx = this.state.idx;
        if (currentIdx == workData.length - 1) {
            this.setState({ idx: 0 });
        } else {
            this.setState({ idx: currentIdx + 1 });
        }

    },

     prevProject() {

        let currentIdx = this.state.idx;
        if (currentIdx == 0) {
            this.setState({ idx: workData.length - 1 });
        } else {
            this.setState({ idx: currentIdx - 1 });
        }

    },

   render() {

    const {
      mouse,
      firstConfig: [s0, d0],
      idx
    } = this.state;

    const {
      baseGridWidth,
      columns,
      isMobile
    } = this.props;

    let renderedGallery;
    let renderedProject;
    let renderedViewport;

    const projectViewThumbnailsWidth = isMobile ? 0 : 1;
    const projectViewThumbnailsDisplay = isMobile && idx !== null ? 'none' : 'inline-block';
    const rows = idx == null ? Math.ceil( workData.length / columns ) : 3;
    const heightRatio = 1.25;

    if (idx !== null) {

      renderedProject =
       <ProjectComponent
        idx={ idx }
        nextProject={ this.nextProject }
        prevProject={ this.prevProject }
        exitProject={ this.exitProject }
        baseGridWidth={ baseGridWidth } />;

      renderedGallery =
      <GalleryComponent
        idx={ idx }
        gallery={ workData[idx]['gallery'] }
        id={ workData[idx]['id'] }
        isMobile={ isMobile }
        nextProject={ this.nextProject }
        prevProject={ this.prevProject }
        exitProject={ this.exitProject }
        baseGridWidth={ baseGridWidth * (columns - projectViewThumbnailsWidth) - 1 } />;

      renderedViewport =
      <ViewportComponent
        idx={ idx }
        projectData={ workData[idx] }
        view={ workData[idx]['view'] }
        baseGridWidth={ baseGridWidth } />;
    }

    const galleryStyle = idx == null
    ? {
        w: spring( columns , [s0, d0]),
        h: spring( 10 , [s0, d0]),
        o: spring( 100 , [s0, d0]),
      }
    : {
        w: spring( projectViewThumbnailsWidth , [s0, d0]),
        h: spring( 3 , [s0, d0]),
        o: spring( 100 , [s0, d0]),
      };

    const projectStyle = idx == null
    ? {
        w: spring( 0 , [s0, d0]),
        y: spring( 0 , [s0, d0]),
        o: spring( 0 , [20, d0]),
      }
    : {
        w: spring( 100, [s0, d0]),
        y: spring( 0, [s0, d0]),
        o: spring( 100 ),
      };

    return (
      <section className='component-work'
        style={{
                height: `${ baseGridWidth * rows * heightRatio }rem`,
            }}>
        <Motion style={ galleryStyle }>
        {({w, h, o}) =>
        <div
            className={(idx !== null) ? 'component-thumbnails project-view' : 'component-thumbnails'}
            style={{
                width: `${ baseGridWidth * w + projectViewThumbnailsWidth }rem`,
                display: `${ projectViewThumbnailsDisplay }`,
                opacity: `${ o/100 }`,
            }}>
          { projectArray.map((item, i) => {

            const s1 = s0 + i * 5;
            const d1 = d0 + i;
            const k = i % 2 == 0 ? -1 : 1;
            const opacity = Math.floor(Math.random() * (Math.round(Math.random())) * 100 / 6);

            const column = i - columns*(Math.floor(i/columns));
            const row = Math.floor(i/columns);

            const defaultCellStyle =
            {
                x: spring(baseGridWidth * column, [s1, d1]),
                y: spring(baseGridWidth * heightRatio * row, [s1, d1]),
                o: spring(opacity, [s1, d1])
            };

            const nextProjectIdx = idx == workData.length - 1 ? 0 : idx + 1;
            const prevProjectIdx = idx == 0 ? workData.length - 1 : idx - 1;

            const cellStyle = idx == null
            ? {
                x: spring(baseGridWidth * column, [s1, d1]),
                y: spring(baseGridWidth * heightRatio * row, [s1, d1]),
                o: spring(100, [s1, d1])
            }
            : i == prevProjectIdx ? {
                x: spring(0, [s1, d1]),
                y: spring(baseGridWidth * heightRatio * 0, [s1, d1]),
                o: spring(85, [s1, d1])
            }
            : i == idx ? {
                x: spring(0, [s1, d1]),
                y: spring(baseGridWidth * heightRatio * 1, [s1, d1]),
                o: spring(100, [s1, d1])
            }
            : i == nextProjectIdx ? {
                x: spring(0, [s1, d1]),
                y: spring(baseGridWidth * heightRatio * 2, [s1, d1]),
                o: spring(85, [s1, d1])
            }
            : {
                x: spring(0, [s1, d1]),
                y: spring(baseGridWidth * heightRatio * 1, [s1, d1]),
                o: spring(0, [s1, d1])
            };

              return (
                <Motion
                  key={ i }
                  defaultStyle={ defaultCellStyle }
                  style={ cellStyle }>
                  {({x, y, o}) => {
                    return (
                      <div
                        id={`thumbnail-${i}`}
                        className={`thumbnail-cell`}
                        onMouseDown={this.handleMouseDown.bind(null, i)}
                        style={{
                          width: `${ baseGridWidth }rem`,
                          height: `${ baseGridWidth * heightRatio }rem`,
                          transform: `translate3d(${x}rem, ${y}rem, 0)`,
                          WebkitTransform: `translate3d(${x}rem, ${y}rem, 0)`,
                          opacity: `${o/100}`,
                        }}
                        >
                        <ThumbnailComponent
                          key={ i }
                          data={ workData[i] }
                          active={ idx===i ? true : false }
                          thumbnailWidth={ baseGridWidth } />
                      </div>
                    );
                  }}
                </Motion>
              );
          })}
        </div>
        }
        </Motion>
        <Motion style={ projectStyle }>
          {({w, y, o}) =>
            <div
              className='component-project'
              style={{
                opacity: o/100,
                width: `${ ((baseGridWidth * (columns - projectViewThumbnailsWidth)) - projectViewThumbnailsWidth*3) * w/100 }rem`,
                transform: `translate3d(0, ${y}rem, 0)`,
                WebkitTransform: `translate3d(0, ${y}rem, 0)`,
                marginLeft: `${ projectViewThumbnailsWidth }rem`,
              }}>

              { renderedProject }
              { renderedGallery }

            </div>
          }
        </Motion>
      </section>
    );
  },
});

export default WorkComponent;