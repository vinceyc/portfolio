// I M P O R T
import React from 'react';

// C O M P O N E N T S
import GalleryComponent from './../gallery/Gallery.jsx';

// D A T A

const PhoneComponent = React.createClass({

  propTypes: {

      width: React.PropTypes.number,

  },

  render() {

      return (
        <div>

          <svg version="1.1" x="0px" y="0px"
           width="132px" height="276px" viewBox="0 0 132 276" enable-background="new 0 0 132 276">
            <path id="bezel_2_" fill="none" stroke="#47FCEA" strokeWidth="2" d="M131,258.964
              c0,8.833-7.191,15.992-16.062,15.992H17.063c-8.871,0-16.063-7.159-16.063-15.992V17.073c0-8.833,7.191-15.992,16.063-15.992h97.875
              c8.87,0,16.062,7.159,16.062,15.992V258.964L131,258.964z"/>
            <rect id="screen_2_" x="10" y="37" fill="none" stroke="#47FCEA" width="111.93" height="199.084">
            </rect>
            <path id="speaker" fill="none" stroke="#47FCEA" d="M78,26.746c0,0.635-0.439,1.147-0.979,1.147H56.918
              c-0.542,0-0.979-0.513-0.979-1.147v-2.58c0-0.635,0.438-1.147,0.979-1.147h20.103c0.54,0,0.979,0.513,0.979,1.147V26.746L78,26.746z
              "/>
            <circle id="camera_1_" fill="none" stroke="#47FCEA" cx="67" cy="13" r="3">
            </circle>
            <ellipse id="lock_1_" fill="none" stroke="#47FCEA" cx="66.04" cy="255.001" rx="10.04" ry="10.001">
            </ellipse>
          </svg>

        </div>
      );
  }

});

export default PhoneComponent;