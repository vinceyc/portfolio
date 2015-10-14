// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import LetterComponent from './element/letter/Letter.jsx';

// C O M P O N E N T S
import PondRipples from './../../general/backgrounds/PondRipples.jsx';
import Warphole from './../../general/backgrounds/Warphole.jsx';
import Snake from './../../general/backgrounds/Snake.jsx';
// D A T A
import homeData from './../../../data/home.js';

// const letterArray = range(homeData['title'].length);
const letterArray = range(50);

const HomeComponent = React.createClass({

    propTypes: {

        section: React.PropTypes.string,
        baseGridWidth: React.PropTypes.number

    },

    getInitialState() {

        return {
            mouse: [0, 0],
            firstConfig: [120,10],
            slider: {dragged: null, num: 0},
            lastPressed: [0, 0],
        };

    },

    componentDidMount() {

    },

    render() {

        const {
            mouse,
            lastPressed,
            firstConfig: [s0, d0],
            slider: {dragged, num},
        } = this.state;

        const {
            section,
            baseGridWidth
        } = this.props;

        const factor = 8;

        const width = (baseGridWidth)/factor;
        const height = (baseGridWidth*4/3)/factor;

        return (
            <section className='section component-home'>
                { letterArray.map((row, i) => {

                    const cellStyle = {
                        width: `${ width }rem`,
                        height: `${ height }rem`
                    };
                    const stiffness = s0;
                    const damping = d0;
                    const defaultLetterStyle = {
                        x: spring(i * -50, [stiffness, damping]),
                        y: spring(0, [stiffness, damping]),
                    }
                    const letterStyle = {
                        x: spring(0, [stiffness, damping]),
                        y: spring(0, [stiffness, damping]),
                    }

                    return (
                    <div
                        key={ i }
                        style={ cellStyle }
                        className='letter-cell'>

                        <Motion
                        defaultStyle={ defaultLetterStyle }
                        style={ letterStyle }>
                        {({x, y}) => {

                            return (

                        <div
                          className="letter-wrapper"
                          style={{
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                          }}
                          >
                            <LetterComponent
                                className='component-navigation'
                                active={ false }
                                width={ width }
                                height={ height }
                                text={ homeData['title'][i] }/>
                            </div>
                            );

                        }}
                        </Motion>

                        </div>
                    );
                })}
            </section>
            );
        }
    });

export default HomeComponent;