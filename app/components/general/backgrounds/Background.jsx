// I M P O R T
import React from 'react';

// R E A C T  S P R I N G
const {TransitionSpring} = require("react-motion");

const BackgroundComponent = React.createClass({

  getInitialState() {
    return {
      mouse: [],
      now: 't' + 0
    };
  },

  handleMouseMove({pageX, pageY}) {
    // Make sure the state is queued and not batched.
    this.setState(() => {
      return {
        mouse: [pageX - 25, pageY - 25],
        now: 't' + Date.now(),
      };
    });
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  willLeave(key, valOfKey) {
    return {
      ...valOfKey,
      opacity: {val: 0, config: [60, 15]},
      scale: {val: 2, config: [60, 15]},
    };
  },

  render() {
    const {mouse: [mouseX, mouseY], now} = this.state;
    const endValue = mouseX == null ? {} : {
      [now]: {
        opacity: {val: 1},
        scale: {val: 0},
        x: {val: mouseX},
        y: {val: mouseY},
      },
    };
    return (
      <section id="spring" className="section-background">
        <TransitionSpring willLeave={this.willLeave} endValue={endValue}>
          {circles =>
            <div
              onMouseMove={this.handleMouseMove}
              onTouchMove={this.handleTouchMove}
              className="background-stage">
              {Object.keys(circles).map(key => {
                const {opacity, scale, x, y} = circles[key];
                return (
                  <div
                    key={Math.random()}
                    className="background-element"
                    style={{
                      opacity: opacity.val,
                      scale: scale.val,
                      transform: `translate3d(${x.val}px, ${y.val}px, 0) scale(${scale.val})`,
                      WebkitTransform: `translate3d(${x.val}px, ${y.val}px, 0) scale(${scale.val})`,
                  }} />
                );
              })}
            </div>
          }
        </TransitionSpring>
      </section>
    );
  },
});

export default BackgroundComponent;