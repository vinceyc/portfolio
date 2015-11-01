// I M P O R T
import React from 'react';
import { Motion, spring } from 'react-motion';

// C O M P O N E N T S
import ButtonComponent from './../../../button/Button.jsx';

const HeaderComponent = React.createClass({

  propTypes: {

    baseGridWidth: React.PropTypes.number,
    changeSection: React.PropTypes.func,
    section: React.PropTypes.string,

  },

  render() {

    const {
      baseGridWidth,
      section,
      changeSection,
    } = this.props;

    return (
      <div
        className='component-header'
        onClick={changeSection.bind(null, 'home')}
        onTouchStart={changeSection.bind(null, 'home')}>
        <h1>

            <ButtonComponent
              text={ 'Vincent Chan: Front-end Developer' }
              className={ section === 'home'  ? 'pressed' : ''}
              height={ 0.75 }
              keycode={ 86 }/>

        </h1>
      </div>
    );
  }
});

export default HeaderComponent;