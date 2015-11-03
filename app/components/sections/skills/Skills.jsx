// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import ListComponent from './element/list/List.jsx';

// D A T A
import skillsData from './../../../data/skills.js';

let skillsItems;
let gridNumber = null;

const SkillsComponent = React.createClass({

    propTypes: {

        baseGridWidth: React.PropTypes.number,
        columns: React.PropTypes.number

    },

    getInitialState() {

        return {

            isPressed: false,
            firstConfig: [270, 30],
            projectIndex: null,
            projectView: false

        }

    },

    componentWillMount() {

        gridNumber = range(skillsData.length);

    },

    componentDidMount() {

        this.props.completeTransition();

    },

  render() {

    const {
      firstConfig: [s0, d0]
    } = this.state;

    const {
      baseGridWidth,
      columns
    } = this.props;

    const rows = Math.ceil( skillsData.length / columns );

    return (
      <section
            className='component-skills'>
        <div className='skills-gallery'>
          {gridNumber.map((row, i) => {
              const cellStyle = {
                width: `${ baseGridWidth - 1 }rem`,
                marginRight: `1rem`,
                height: `${ baseGridWidth + 3 }rem`,
              };
              const stiffness = s0 + i * 15;
              const damping = d0 + i * 3;
              const motionStyle =
                {
                  x: spring(0, [stiffness, damping]),
                  y: spring(0, [stiffness, damping]),
                };

              return (
                <div
                  key={i}
                  style={ cellStyle }
                  className='skills-cell'>
                  <Motion
                    defaultStyle={{ x: -150 * i, y: 0 }}
                    style={ motionStyle }>
                    {({x, y}) => {

                      return (
                        <div
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