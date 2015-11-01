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
      className
    } = this.props;

    let correctWidth;

    if (width == undefined) {
      correctWidth = `100%`;
    } else {
      correctWidth = `${ width }rem`;
    }

    const {
      isActive,
      isHovered
    } = this.state;

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
                width: correctWidth,
                marginRight: `${ 1 }rem`,
                height: `${ height }rem`
              }}>
                    <div
                      className={`text-button ${ className }`}
                      data-hover={ text }
                      style={{
                        lineHeight: `${ height }rem`,
                        height: `${ height}rem`,
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