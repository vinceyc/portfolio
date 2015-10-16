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
    data: React.PropTypes.object

  },

  render() {

    const {
      changeSection,
      section,
      baseGridWidth,
      idx,
      data
    } = this.props;

    const endStyle = section === 'home' ?
      {
          top: spring( 45*idx, [ 40 * ( 1 + idx ), 20 ]),
          left: spring( -(baseGridWidth)*idx, [ 40 * ( 1 + idx ), 20 ]),
          opacity: spring( 1, [ 20 * ( 1 + idx ), 20 ] )
      } :
      {
          top: spring( 0, [ 40 * ( 1 + idx ), 20 ]),
          left: spring( 0, [ 40 * ( 1 + idx ), 20 ]),
          opacity: spring( 0.9, [ 20 * ( 1 + idx ), 20 ] )
      };

    return (
      <Motion
        defaultStyle={{top: 0, left: 0, opacity: 0}}
        style={ endStyle }>
          {values =>
            <h2 className='menu-items'
              ref={ data['ref'] }
              id={ 'menu-'+ data['ref'] }
              onClick={ changeSection }
              onTouchStart={ changeSection }
              style={{
                  opacity: values.opacity,
                  WebkitTransform: `translate3d( ${ values.left }rem, ${ values.top }px, 0 )`,
                  transform: `translate3d( ${ values.left }rem, ${ values.top }px, 0 )`,
              }}>

                <ButtonComponent
                  text={ data['text'] }
                  className={ section === data['ref']  ? 'pressed' : ''}
                  width={ baseGridWidth*2/3 }
                  height={ 2.5 }
                  keycode={ data['keycode'] }
                  isHeading={ true } />

            </h2>
          }
      </Motion>
    );
  }
});

export default MenuitemComponent;