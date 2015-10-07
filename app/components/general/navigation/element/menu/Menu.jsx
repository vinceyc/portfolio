// I M P O R T
import React from 'react';
import { Motion, spring } from 'react-motion';

// C O M P O N E N T S
import MenuitemComponent from './../menuitem/Menuitem.jsx';

// D A T A
import menuData from './../../../../../data/menu.js';

const MenuComponent = React.createClass({

  propTypes: {

    baseGridWidth: React.PropTypes.number,
    changeSection: React.PropTypes.func,
    section: React.PropTypes.string,
    springValues: React.PropTypes.array

  },

  render() {

    const {
      section,
      baseGridWidth,
      changeSection,
      springValues: [s0, d0]
    } = this.props;

    const endStyle = section === 'home' ?
      {
          left: spring( baseGridWidth, [s0, d0]),
          top: spring( 1, [s0, d0] )
      } :
      {
          left: spring( 0, [s0, d0]),
          top: spring( 0, [s0, d0] )
      };

    return (
        <Motion style={ endStyle }>
          {value =>
              <div
                  className='component-menu'
                  style={{
                      left: `${ value.left }em`,
                      WebkitTransform: `translate3d(0, ${ value.top }em, 0)`,
                      transform: `translate3d(0, ${ value.top }em, 0)`,
                  }}>

                  { menuData.map( function ( menu, i ) {

                      return (

                        <MenuitemComponent
                          changeSection={ changeSection.bind( null, menu['ref'], i ) }
                          section={ section }
                          key={ i }
                          idx={ i }
                          baseGridWidth={ baseGridWidth }
                          data={ menu } />
                      );

                  }.bind( this ))}
              </div>
          }
        </Motion>
    );
  }
});

export default MenuComponent;