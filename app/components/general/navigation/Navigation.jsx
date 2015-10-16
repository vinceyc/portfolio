// I M P O R T
import React from 'react';

// C O M P O N E N T S
import HeaderComponent from './element/header/Header.jsx';
import MenuComponent from './element/menu/Menu.jsx';

const NavComponent = React.createClass({

  propTypes: {

    baseGridWidth: React.PropTypes.number,
    changeSection: React.PropTypes.func,
    section: React.PropTypes.string

  },

  render() {

    const {
      section,
      baseGridWidth,
      changeSection
    } = this.props;

    const springValues = [250, 50];

    return (

      <div
        className='column'
        style={{
          width: `${ baseGridWidth - 1 }rem`,
          marginRight: `${ 1 }rem`
        }}>
        <HeaderComponent
          changeSection={changeSection}
          baseGridWidth={baseGridWidth}
          springValues={springValues}
          section={section} />

        <MenuComponent
          changeSection={changeSection}
          baseGridWidth={baseGridWidth}
          springValues={springValues}
          section={section} />
      </div>
    );
  }
});

export default NavComponent;