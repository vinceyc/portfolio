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
    isMobile: React.PropTypes.bool

  },

  render() {

    const {
      section,
      baseGridWidth,
      changeSection,
      isMobile
    } = this.props;

    const s0 = 40;
    const d0 = 20;


    return (
      <div className='component-menu'>

          { menuData.map( function ( menu, i ) {

              return (

                <MenuitemComponent
                  changeSection={ changeSection.bind( null, menu['ref'], i ) }
                  section={ section }
                  isMobile={ isMobile }
                  baseGridWidth={ baseGridWidth }
                  key={ i }
                  idx={ i }
                  data={ menu } />
              );

          }.bind( this ))}
      </div>
    );
  }
});

export default MenuComponent;