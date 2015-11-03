// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

// C O M P O N E N T S
import LetterComponent from './element/letter/Letter.jsx';

// D A T A
import homeData from './../../../data/home.js';

const letterArray = range(homeData['title'].length);

const HomeComponent = React.createClass({

    propTypes: {

        baseGridWidth: React.PropTypes.number,
        columns: React.PropTypes.number,
        completeTransition: React.PropTypes.func,

    },

    getInitialState() {

        return {
            mouse: [0, 0],
            firstConfig: [20,10],
            slider: {dragged: null, num: 0},
            lastPressed: [0, 0],
        };

    },

    componentDidMount() {

        this.props.completeTransition();

    },

    render() {

        const {
            mouse,
            lastPressed,
            firstConfig: [s0, d0],
            slider: {dragged, num},
        } = this.state;

        const {
            baseGridWidth
        } = this.props;

        const factor = 3;
        const width = (baseGridWidth)/factor;
        const height = (baseGridWidth*4/3)/factor;

        return (
            <section className='component-home'>
                { letterArray.map((row, i) => {

                    const cellStyle = {
                        width: `${ width }rem`,
                        height: `${ height }rem`
                    };
                    const stiffness = s0;
                    const damping = d0;

                    const defaultLetterStyle = {
                        x: spring(i * 10 * Math.random() * (Math.round(Math.random()) * 2 - 1), [stiffness, damping]),
                        y: spring(i * 20 * Math.random() * (Math.round(Math.random()) * 2 - 1), [stiffness, damping]),
                        o: spring(0, [stiffness*10, damping*4]),
                        lightness: spring(0),
                    }

                    const letterStyle = {
                        x: spring(0, [stiffness*10, damping*4]),
                        y: spring(0, [stiffness, damping]),
                        o: spring(1, [stiffness*10, damping*4]),
                        lightness: spring(100 - (letterArray.length - i), [stiffness, damping]),
                    }

                    return (
                    <div
                        key={ i }
                        style={ cellStyle }
                        className='letter-cell'>

                        <Motion
                        defaultStyle={ defaultLetterStyle }
                        style={ letterStyle }>
                        {({x, y, o, lightness}) => {

                            return (

                        <div
                          className="letter-wrapper"
                          style={{
                            color: `hsl(221, 50%, ${lightness}%)`,
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