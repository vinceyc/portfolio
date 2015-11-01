// I M P O R T
import React from 'react';

// C O M P O N E N T S
import HeaderComponent from './element/header/Header.jsx';
import MenuComponent from './element/menu/Menu.jsx';

import { Motion, spring } from 'react-motion';

const NavComponent = React.createClass({

  propTypes: {

    baseGridWidth: React.PropTypes.number,
    columns: React.PropTypes.number,
    changeSection: React.PropTypes.func,
    section: React.PropTypes.string,
    isMobile: React.PropTypes.bool

  },

  render() {

    const {
      section,
      baseGridWidth,
      changeSection,
      isMobile,
      columns
    } = this.props;

    const s0 = 100;
    const d0 = 20;

    const endStyle =
    {
        l: spring( 0, [s0, d0]),
        o: spring( 100 ),
        m: spring( 1 ),
    };

    return (
        <Motion defaultStyle={{l: -2, o: 0, m: 1}} style={ endStyle }>
          {value =>
            <div
              className='header'
              style={{
                opacity: value.o/100,
                transform: `translate3d(${ value.l }rem, 0, 0)`,
                WebkitTransform: `translate3d(${ value.l }rem, 0, 0)`,
                width: `${ (baseGridWidth * columns) - value.m }rem`,
                height: `3rem`,
                marginRight: `${ value.m }rem`
              }}>

              <HeaderComponent
                changeSection={changeSection}
                baseGridWidth={baseGridWidth}
                section={section} />

              <MenuComponent
                changeSection={changeSection}
                baseGridWidth={baseGridWidth}
                isMobile={ isMobile }
                section={section} />

            </div>
          }
        </Motion>
    );
  }
});

export default NavComponent;