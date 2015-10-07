// I M P O R T
import React from 'react';

// C O M P O N E N T S

// D A T A

const DesktopComponent = React.createClass({

  propTypes: {

      width: React.PropTypes.number,

  },

  render() {

      return (
        <div>

          <svg version="1.1" x="0px" y="0px"
             width="694px" height="384px" viewBox="0 0 694 384" enable-background="new 0 0 694 384">
            <path id="bezel_1_" fill="none" stroke="#47FCEA" strokeWidth="2" d="M595,1H99
              C85.504,1,74,12.074,74,25.79v326.238h546V25.79C620,12.073,608.537,1,595,1z"/>
            <circle id="webcam" fill="none" stroke="#47FCEA" strokeWidth="2" cx="348" cy="20" r="4">
            </circle>
            <path id="Shape" fill="none" stroke="#47FCEA" strokeWidth="2" d="M641.812,383.01H52.288C21.641,383.01,1,372.494,1,368.022
              v-13.595C1,353.084,2.335,352,3.995,352h686.109c1.661,0,2.998,1.084,2.998,2.428v14.129
              C693.096,372.092,677.112,383.01,641.812,383.01z"/>
            <path id="Line" fill="none" stroke="#47FCEA" strokeLinecap="square" d="M1.5,366.5h689.743"/>
            <rect id="screen_1_" x="96" y="40" fill="none" stroke="#47FCEA" width="501.074" height="292.009">
            </rect>
            <path id="touchpad" fill="none" stroke="#47FCEA" d="M422,353v3.087c0,2.201-4.334,2.866-7.613,2.866
              H279.815c-3.451,0-7.815-0.664-7.815-2.866V353"/>
          </svg>

        </div>
      );
  }

});

export default DesktopComponent;