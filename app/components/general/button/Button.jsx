// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

const ButtonComponent = React.createClass({

  propTypes: {

      text: React.PropTypes.string,
      className: React.PropTypes.string,
      height: React.PropTypes.number,
      width: React.PropTypes.number,
      keycode: React.PropTypes.number

  },

  getInitialState() {
    return {
      isActive: false,
      isHovered: false
    }
  },

  setActive() {
    console.log('setActive');
    this.setState({
      isActive: true
    });
  },

  handleMouseEnterLeave() {

    var current = this.state.isHovered;

    this.setState({
      isHovered: !current
    });

  },

  handleTouchStart() {

    this.setActive();

  },

  handleMouseDown() {

    this.setActive();

  },

  render() {

    const {
      text,
      height,
      width,
      keycode,
      className,
      isHeading
    } = this.props;

    const {
      isActive,
      isHovered
    } = this.state;

    let classes;
    let activeClass;

    const buttonStyle = className==='pressed' || isHovered ? {
        highlight: spring( 100, [40, 10]),
        shadow: spring( 80, [40, 10])
    } : {
        highlight: spring( 80, [40, 10]),
        shadow: spring( 100, [40, 10])
    };

    const buttonDefaultStyle = {
        highlight: 80,
        shadow: 100
    };

    classes = isHeading ? 'menu-button text-button' : 'text-button';
    activeClass = `component-button button-${ keycode } ${ className }`;

      return (
         <Motion

          style={ buttonStyle } defaultStyle={ buttonDefaultStyle }>
          {({highlight, shadow}) =>

            <div
              onMouseDown={ this.handleMouseDown }
              onMouseEnter={ this.handleMouseEnterLeave }
              onMouseLeave={ this.handleMouseEnterLeave }
              onTouchStart={ this.handleTouchStart }
              className={ activeClass }
              style={{
                width: `${ width - 1 }rem`,
                marginRight: `${ 1 }rem`,
                height: `${ height }rem`,
                background: `linear-gradient( 100deg,
                  hsla(0, 0%, ${ highlight }%, 1),
                  hsla(0, 0%, ${ shadow }%, 1) )`
              }}>
                    <div
                      className={ classes }
                      data-hover={ text }
                      style={{
                        background: `linear-gradient( 135deg,
                        hsla(0, 0%, ${ shadow }%, 1),
                        hsla(0, 0%, ${ highlight }%, 1) )`,
                        lineHeight: `${ height - 0.5 }rem`,
                        width: `${ width - 1.75 }rem`,
                        height: `${ height - 0.5 }rem`,
                        paddingLeft: `0.25rem`,
                        margin: `0.25rem`,
                      }}>
                      { text }
                    </div>
            </div>

          }
        </Motion>
    );
  }
});

export default ButtonComponent;