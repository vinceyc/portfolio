// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import ListComponent from './element/list/List.jsx';

// D A T A
import skillsData from './../../../data/skills.js';

let skillsItems;
const gridHeight = 210;
let gridNumber = null;

const SkillsComponent = React.createClass({

  propTypes: {

    section: React.PropTypes.string,
    baseGridWidth: React.PropTypes.number

  },

  getInitialState() {
    return {
      delta: [0, 0],
      mouse: [0, 0],
      isPressed: false,
      firstConfig: [270, 30],
      lastPressed: [0, 0],
      projectIndex: null,
      projectView: false
    }
  },

  componentWillMount() {
    gridNumber = range(skillsData.length);
  },

  handleTouchStart(pos, press, e) {
    this.handleMouseDown(pos, press, e.touches[0]);
    this.enterProject(pos);
  },

  handleMouseDown(i, [pressX, pressY], {pageX, pageY}) {
    this.setState({
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
      isPressed: true,
      lastPressed: i,
    });
  },

  handleTouchMove(e) {
    if (this.state.isPressed) {
      e.preventDefault();
    }
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove({pageX, pageY}) {
    const {isPressed, delta: [dx, dy]} = this.state;
    if (isPressed) {
      this.setState({mouse: [pageX - dx, pageY - dy]});
    }
  },

  handleMouseUp() {
    this.setState({
      isPressed: false,
      delta: [0, 0],
    });
  },

  render() {

    const {
      mouse,
      isPressed,
      lastPressed,
      firstConfig: [s0, d0],
    } = this.state;

    const {
      baseGridWidth,
      section
    } = this.props;

    return (
      <section className='section component-skills'>
        <div className='skills-gallery'>
          {gridNumber.map((row, i) => {
              const cellStyle = {
                width: `${ baseGridWidth - 1}rem`,
                marginRight: `1rem`,
                height: gridHeight,
              };
              const stiffness = s0 + i * 15;
              const damping = d0 + i * 3;
              const motionStyle =  section == 'skills'
                ? {
                    x: spring(0, [stiffness, damping]),
                    y: spring(0, [stiffness, damping]),
                  }
                : {
                    x: spring(-1500, [stiffness, damping]),
                    y: spring(-1500, [stiffness, damping]),
                  };

              return (
                <div
                  key={i}
                  style={ cellStyle }
                  className='thumbnail-cell'>
                  <Motion
                    defaultStyle={{ x: -1500, y: -1500 }}
                    style={ motionStyle }>
                    {({x, y}) => {

                      return (
                        <div
                          onMouseDown={this.handleMouseDown.bind(null, i, [x, y])}
                          onTouchStart={this.handleTouchStart.bind(null, i, [x, y])}
                          style={{
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                          }}>

                          <ListComponent
                            key={i}
                            type={skillsData[i]['type']}
                            list={skillsData[i]['list']} />

                        </div>
                      );
                    }}
                  </Motion>
                </div>
              );
          })}
        </div>
      </section>
    )
  }
});

export default SkillsComponent;