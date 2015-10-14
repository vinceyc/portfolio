// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

// D A T A

const PhoneComponent = React.createClass({

  propTypes: {

      width: React.PropTypes.number,
      height: React.PropTypes.number,

  },

  render() {

    const {
      width,
      height
    } = this.props;

    const s0 = 175;
    const d0 = 25;

    const svgStyle = {
        h: spring( 180, [40, 10]),
        s: spring( 75, [40, 10]),
        l: spring( 42, [40, 10]),
        strokeWidth: spring( 1, [s0, d0]),
        strokeDashoffset: spring( 0 , [s0, d0]),
        strokeDasharray: spring( 0.5, [s0, d0]),
    };

    const svgDefaultStyle = {
        h: 180,
        s: 50,
        l: 0,
        strokeWidth: 60,
        strokeDashoffset: 1000,
        strokeDasharray: 15,
    };

    return (
        <Motion defaultStyle={ svgDefaultStyle } style={ svgStyle }>
          {({
            h,
            l,
            s,
            strokeWidth,
            strokeDashoffset,
            strokeDasharray
          }) =>
            <svg
              viewBox={ `0 0 ${ width } ${ height }` }
              width={ `${ width }px` } height={ `${ height }px` }>
              <path
                id='bezel_2_' fill='none'
                stroke={ `hsl(${ h }, ${ s }%, ${ l }%)` }
                strokeWidth={ `${ strokeWidth*2 }px` }
                strokeDashoffset={ `${ strokeDashoffset }` }
                strokeDasharray={ `${ strokeDasharray }` }
                d='M131,258.964
                c0,8.833-7.191,15.992-16.062,15.992H17.063c-8.871,0-16.063-7.159-16.063-15.992V17.073c0-8.833,7.191-15.992,16.063-15.992h97.875
                c8.87,0,16.062,7.159,16.062,15.992V258.964L131,258.964z'/>
              <rect
                stroke={ `hsl(${ h }, ${ s }%, ${ l }%)` }
                strokeWidth={ `${ strokeWidth }px` }
                strokeDashoffset={ `${ strokeDashoffset }` }
                strokeDasharray={ `${ strokeDasharray }` }
                id='screen_2_' x='10' y='37' fill='none' width='111.93' height='199.084'>
              </rect>
              <path
                stroke={ `hsl(${ h }, ${ s }%, ${ l }%)` }
                strokeWidth={ `${ strokeWidth }px` }
                strokeDashoffset={ `${ strokeDashoffset }` }
                strokeDasharray={ `${ strokeDasharray }` }
                id='speaker' fill='none' d='M78,26.746c0,0.635-0.439,1.147-0.979,1.147H56.918
                c-0.542,0-0.979-0.513-0.979-1.147v-2.58c0-0.635,0.438-1.147,0.979-1.147h20.103c0.54,0,0.979,0.513,0.979,1.147V26.746L78,26.746z
                '/>
              <circle
                stroke={ `hsl(${ h }, ${ s }%, ${ l }%)` }
                strokeWidth={ `${ strokeWidth }px` }
                strokeDashoffset={ `${ strokeDashoffset }` }
                strokeDasharray={ `${ strokeDasharray }` }
                id='camera_1_' fill='none' cx='67' cy='13' r='3'>
              </circle>
              <ellipse
                stroke={ `hsl(${ h }, ${ s }%, ${ l }%)` }
                strokeWidth={ `${ strokeWidth }px` }
                strokeDashoffset={ `${ strokeDashoffset }` }
                strokeDasharray={ `${ strokeDasharray }` }
                id='lock_1_' fill='none' cx='66.04' cy='255.001' rx='10.04' ry='10.001'>
              </ellipse>
            </svg>
            }
          </Motion>
      );
  }

});

export default PhoneComponent;