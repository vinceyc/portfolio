// I M P O R T
import React from 'react';

// C O M P O N E N T S

// D A T A

const TabletComponent = React.createClass({

  propTypes: {

      width: React.PropTypes.number,

  },

  render() {

      return (
        <div>

          <svg version='1.1' x='0px' y='0px'
             width='217px' height='319px' viewBox='0 0 217 319' enable-background='new 0 0 217 319'>
            <path id='bezel' fill='none' stroke='#47FCEA' strokeWidth='2' d='M203.986,318H13.097
              c-6.635,0-12.014-5.377-12.014-12.01V13.093c0-6.633,5.378-12.01,12.014-12.01h190.89c6.636,0,12.014,5.377,12.014,12.01V305.99
              C216,312.623,210.622,318,203.986,318z'/>
            <path id='bezel-2' fill='none' stroke='#47FCEA' strokeWidth='2' d='M203.986,318H13.097
              c-6.635,0-12.014-5.377-12.014-12.01V13.093c0-6.633,5.378-12.01,12.014-12.01h190.89c6.636,0,12.014,5.377,12.014,12.01V305.99
              C216,312.623,210.622,318,203.986,318z'/>
            <rect id='screen' x='18' y='33' fill='none' stroke='#47FCEA' width='181.999' height='252.917'>
            </rect>
            <circle id='lock' fill='none' stroke='#47FCEA' cx='109.021' cy='301.021' r='8.021'>
            </circle>
            <circle id='camera' fill='none' stroke='#47FCEA' cx='107.99' cy='17.99' r='2.99'>
            </circle>
          </svg>

        </div>
      );
  }

});

export default TabletComponent;