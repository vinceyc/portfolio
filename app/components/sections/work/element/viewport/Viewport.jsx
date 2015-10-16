// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

// C O M P O N E N T S
import PhoneComponent from './Phone.jsx';
import TabletComponent from './Tablet.jsx';
import DesktopComponent from './Desktop.jsx';

// D A T A

const ViewportComponent = React.createClass({

  propTypes: {

      projectData: React.PropTypes.object,
      view: React.PropTypes.string,
      baseGridWidth: React.PropTypes.number,
      projectIndex: React.PropTypes.number

  },

  render() {

    const {
      projectData,
      view,
      baseGridWidth,
      projectIndex
    } = this.props;

    const viewportDefaultStyle = {
      x: spring( 200 , [150, 40]),
      y: spring( 0 , [150, 40]),
      o: spring( 0 , [150, 40]),
    };

    const viewportStyle = {
      x: spring( 0, [150, 40]),
      y: spring( 0, [150, 40]),
      o: spring( 100 ),
    };

    let
    width,
    height,
    galleryWidth,
    galleryHeight,
    viewportWidth,
    viewportHeight;

    let renderedSection;

    if ( view === 'phone' ) {
        renderedSection = <PhoneComponent width={viewportWidth} height={viewportHeight} />;
    }
    if ( view === 'tablet' ) {
        renderedSection = <TabletComponent baseGridWidth={baseGridWidth} />;
    }
    if ( view === 'desktop' ) {
        renderedSection = <DesktopComponent baseGridWidth={baseGridWidth} />;
    }

      return (
        <section>

          <Motion style={ viewportStyle } defaultStyle={ viewportDefaultStyle }>
            {({x, y, o}) =>
            <div
                className='column'
                style={{
                  opacity: o/100,
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                }}>
                Hello

              </div>
            }
          </Motion>


        </section>
      );
  }

});

export default ViewportComponent;