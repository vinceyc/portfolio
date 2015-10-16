"use_strict"

// I M P O R T
import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import range from 'lodash.range';

React.initializeTouchEvents(true);

// C O M P O N E N T S
import NavComponent from './components/general/navigation/Navigation.jsx';
import SectionComponent from './components/sections/Section.jsx';
const Main = React.createClass({

    getInitialState() {
        return {
            section: 'work',
            sections: ['work'],
            firstConfig: [80,10],
            isTransitioning: false,
            baseGridWidth: 8
        }
    },

    componentWillMount() {

        this.resize();

    },

    componentDidMount() {

        window.addEventListener('keydown', this.handleOnKeyDown);
        window.addEventListener('keyup', this.handleOnKeyUp);

      },

    handleOnKeyUp(e) {

    },

    handleOnKeyDown(e) {

        if (e.keyCode === 87)
        {
          this.setState({ section: 'work', sections: ['work'] });
        }
        else if (e.keyCode === 83)
        {
          this.setState({ section: 'skills', sections: ['skills'] });
        }
        else if (e.keyCode === 67)
        {
          this.setState({ section: 'contact', sections: ['contact'] });
        }

    },

    resize() {

        console.log("[resize]");

        const width = window.innerWidth;

        if ( width > 1890 ) {
            this.setState({ baseGridWidth: 12 });
        }
        if ( width > 1280 ) {
            this.setState({ baseGridWidth: 9 });
        }
        else if ( width > 860 ) {
            this.setState({ baseGridWidth: 9 });
        }
        else if ( width > 640 ) {
            this.setState({ baseGridWidth: 9 });
        }

    },

    changeSection(key) {

        if (key !== this.state.section) {

            const {...newSection} = this.state.sections;

            this.setState({
                section: key,
                sections: [key],
                isTransitioning: true
             });
        }
        event.preventDefault();

    },

    getStyles() {
        let configs = {};
        Object.keys(this.state.sections).forEach(key => {
          configs[key] = {
            opacity: spring(1, [50, 10]),
            text: this.state.sections[key]
          };
        });
        return configs;
    },

    willEnter(key) {
        return {
          opacity: spring(0, [50, 10]),
          text: this.state.sections[key]
        };
    },

    willLeave(key, style) {
        return {
          opacity: spring(0, [50, 10]),
          text: style.text,
        };
    },

    handleClick(key) {
        const {...newBlocks} = this.state.sections;
        delete newBlocks[key];
        this.setState({sections: newBlocks});
    },

    render(){

        const {
            section,
            isTransitioning,
            baseGridWidth,
            firstConfig: [s0, d0]
        } = this.state;

        return (

            <div id='wrapper' className='wrapper'>

                <NavComponent
                    className='component-navigation column'
                    changeSection={ this.changeSection }
                    baseGridWidth={ baseGridWidth }
                    isTransitioning={ isTransitioning }
                    section={ section } />

                <TransitionMotion
                    styles={this.getStyles()}
                    willEnter={this.willEnter}
                    willLeave={this.willLeave}>
                    {interpolatedStyles =>
                        <div
                        style={{
                          width: `${ (baseGridWidth * 3) + 3 }rem`,
                          display: `inline-block`,
                        }}>
                        {Object.keys(interpolatedStyles).map(key => {
                        const {text, ...style} = interpolatedStyles[key];
                        return (
                                <SectionComponent
                                    key={ key }
                                    section={ text }
                                    baseGridWidth={ baseGridWidth } />
                            );
                            })}
                        </div>
                    }
                </TransitionMotion>

            </div>

        );

    }

});

React.render(<Main />, document.getElementById('App'));