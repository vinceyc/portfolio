// I M P O R T
import React from 'react';
import {Spring} from 'react-motion';
import range from 'lodash.range';

const gridWidth = 150;
const gridHeight = 150;
const grid = range(4).map(() => range(6));

const Snake = React.createClass({
  getInitialState() {
    return {
      mouse: [0, 0],
      positionX: 0,
      positionY: 0,
    };
  },

  componentDidUnmount() {
    console.log("componentDidUnmount");
  },

  componentDidMount() {
    const rect = document.getElementById('wrapper').getBoundingClientRect(),
    x = rect.left,
    y = rect.top,
    w = rect.right - rect.left,
    h = rect.bottom - rect.top;

    this.setState(() => {
      return {
        positionX: x,
        positionY: y
      };
    });

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  },

  handleMouseMove({pageX, pageY}) {

    this.setState({
      mouse: [
        pageX,
        pageY
      ]});
  },

  handleTouchMove({touches}) {
    this.handleMouseMove(touches[0]);
  },

  getEndValue(prevValue) {
    // `prevValue` is the interpolated value of the last tick
    const endValue = prevValue.map((_, i) => {
      return i === 0
        ? {val: this.state.mouse, config: []}
        : {val: prevValue[i - 1].val, config: [60, 15]};
    });
    return endValue;
  },


  render() {
    return (
      <Spring
        defaultValue={range(18).map(() => ({val: [0, 0]}))}
        endValue={this.getEndValue}>
        {balls =>
          <div className='snake-stage' id='snake-stage'>
            {balls.map(({val: [x, y]}, i) =>
              <div
                key={i}
                className='snake-element'
                style={{
                  WebkitTransform: `translate3d(${x}px, ${y}px, 120px)`,
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                  zIndex: balls.length - i,
                  opacity: (i+1)/balls.length,
                }} />
            )}
          </div>
        }
      </Spring>
    );
  },
});

export default Snake;