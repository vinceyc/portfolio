// I M P O R T
import React from 'react';
import { Motion, spring } from 'react-motion';

const HeaderComponent = React.createClass({

  propTypes: {

    baseGridWidth: React.PropTypes.number,
    changeSection: React.PropTypes.func,
    section: React.PropTypes.string,
    springValues: React.PropTypes.array

  },

  render() {

    const {
      baseGridWidth,
      section,
      changeSection,
      springValues: [s0, d0]
    } = this.props;

    const endStyle =
      {
          w: spring( baseGridWidth, [s0, d0]),
          l: spring( 0, [s0, d0]),
          o: spring( 100 )
      };

    return (
        <Motion defaultStyle={{w: 0, l: -1200, o: 0}} style={ endStyle }>
          {value =>
             <h3
              className='component-header'
              onClick={changeSection.bind(null, 'home')}
              onTouchStart={changeSection.bind(null, 'home')}
              style={{
                  opacity: value.o/100,
                  transform: `translate3d(${ value.l }px, 0, 0)`,
                  WebkitTransform: `translate3d(${ value.l }px, 0, 0)`,
                  w: `${ value.w }%`
              }}>A front-end development & design showcase
            </h3>
          }
        </Motion>
    );
  }
});

export default HeaderComponent;