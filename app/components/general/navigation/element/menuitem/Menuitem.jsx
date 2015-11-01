// I M P O R T
import React from 'react';
import { Motion, spring } from 'react-motion';

// C O M P O N E N T S
import ButtonComponent from './../../../button/Button.jsx';

const MenuitemComponent = React.createClass({

  propTypes: {

    changeSection: React.PropTypes.func,
    section: React.PropTypes.string,
    idx: React.PropTypes.number,
    baseGridWidth: React.PropTypes.number,
    data: React.PropTypes.object,
    isMobile: React.PropTypes.bool,

  },

  render() {

    const {
      changeSection,
      section,
      idx,
      baseGridWidth,
      data,
      isMobile
    } = this.props;

    const endStyle =
    {
        top: spring( 0, [ 100 * ( 3 - idx ), 20 ]),
        left: spring( baseGridWidth * 0.5 * idx, [ 100 * ( 3 - idx ), 20 ]),
        opacity: spring( 1, [ 20 * ( 3 - idx ), 20 ] )
    };

    return (
      <Motion
        defaultStyle={{top: 0, left: 0, opacity: 0}}
        style={ endStyle }>
          {values =>
            <h3 className='menu-items'
              ref={ data['ref'] }
              id={ 'menu-'+ data['ref'] }
              onClick={ changeSection }
              onTouchStart={ changeSection }
              style={{
                  opacity: values.opacity,
                  WebkitTransform: `translate3d( ${ values.left }rem, ${ values.top }rem, 0 )`,
                  transform: `translate3d( ${ values.left }rem, ${ values.top }rem, 0 )`,
              }}>

                <ButtonComponent
                  text={ data['text'] }
                  className={ section === data['ref']  ? 'pressed' : ''}
                  height={ 0.75 }
                  keycode={ data['keycode'] }/>

            </h3>
          }
      </Motion>
    );
  }
});

export default MenuitemComponent;