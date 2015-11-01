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
      idx: React.PropTypes.number

  },

  render() {

    const {
      projectData,
      view,
      baseGridWidth,
      idx
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
    height;

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

    let renderedSection;

    if ( view === 'phone' ) {
        renderedSection = <PhoneComponent width={width} height={height} />;
    }
    if ( view === 'tablet' ) {
        renderedSection = <TabletComponent width={width} height={height} />;
    }
    if ( view === 'desktop' ) {
        renderedSection = <DesktopComponent width={width} height={height} />;
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
                { renderedSection }

              </div>
            }
          </Motion>


        </section>
      );
  }

});

export default ViewportComponent;