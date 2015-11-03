"use_strict"

// I M P O R T
import React from 'react';
import { Motion, spring } from 'react-motion';
import range from 'lodash.range';

React.initializeTouchEvents(true);

// C O M P O N E N T S
import NavComponent from './components/general/navigation/Navigation.jsx';
import SectionComponent from './components/sections/Section.jsx';

const Main = React.createClass({

    getInitialState() {
        return {
            section: 'home',
            firstConfig: [ 80, 10 ],
            isFocused: false,
            isMobile: false,
            baseGridWidth: 9,
            columns: 3
        }
    },

    componentWillMount() {

        this.handleResize();

    },

    componentDidMount() {

        this.handleResize();
        document.getElementById('container').style.opacity = 1;
        window.addEventListener('keydown', this.handleOnKeyDown);
        window.addEventListener('keyup', this.handleOnKeyUp);
        window.addEventListener('resize', this.handleResize);

    },

    handleOnKeyDown(e) {

        if (!this.state.isFocused) {

            if (e.keyCode === 86)
            {
              this.setState({ section: 'home' });
            }
            else if (e.keyCode === 87)
            {
              this.setState({ section: 'work' });
            }
            else if (e.keyCode === 83)
            {
              this.setState({ section: 'skills' });
            }
            else if (e.keyCode === 67)
            {
              this.setState({ section: 'contact' });
            }

        }

    },

    toggleFocusState(bool) {
        this.setState({
            isFocused: bool
        });
    },

    toggleMobileState(bool) {
        this.setState({
            isMobile: bool
        });
    },

    handleResize() {

        const width = window.innerWidth;
        const windowDPR = window.devicePixelRatio;
        const realWidth = width * windowDPR;
        const appContainer = document.getElementById('App');

        // console.log("[window width: "+width+" | window real width: "+realWidth+" | DPI: "+windowDPR+" | # columns: "+this.state.columns+" | base width: "+this.state.baseGridWidth+"em");

        if ( realWidth >= 1440 * windowDPR ) {
            this.setState({
                baseGridWidth: 12,
                columns: 6,
                isMobile: false
            });

        }
        else if ( realWidth <= 1440 * windowDPR && realWidth >= 1281 * windowDPR ) {
            this.setState({
                baseGridWidth: 11,
                columns: 6,
                isMobile: false
             });
        }
        else if ( realWidth <= 1280 * windowDPR && realWidth >= 1141 * windowDPR ) {
            this.setState({
                baseGridWidth: 9,
                columns: 6,
                isMobile: false
             });
        }
        else if ( realWidth <= 1140 * windowDPR && realWidth >= 961 * windowDPR ) {
            this.setState({
                baseGridWidth: 11,
                columns: 4,
                isMobile: false
             });
        }
        else if ( realWidth <= 960 * windowDPR && realWidth >= 861 * windowDPR ) {
            this.setState({
                baseGridWidth: 10,
                columns: 4,
                isMobile: true
             });
        }
         else if ( realWidth <= 860 * windowDPR && realWidth >= 775 * windowDPR ) {
            this.setState({
                baseGridWidth: 9,
                columns: 4,
                isMobile: true
             });
        }
        else if ( realWidth <= 774 * windowDPR && realWidth >= 661 * windowDPR ) {
            this.setState({
                baseGridWidth: 10,
                columns: 3,
                isMobile: true
             });
        }
        else if ( realWidth <= 660 * windowDPR) {
            this.setState({
                baseGridWidth: 10,
                columns: 2,
                isMobile: true
             });
        }

        appContainer.style.width = `${this.state.baseGridWidth * this.state.columns}rem`;

    },

    changeSection(key) {

        if (key !== this.state.section) {
            this.setState({
                section: key
             });
        }
        event.preventDefault();

    },

    render(){

        const {
            section,
            isFocused,
            isMobile,
            baseGridWidth,
            columns,
            firstConfig: [s0, d0]
        } = this.state;

        return (

            <div id='wrapper'
                className='wrapper'>

                <NavComponent
                    changeSection={ this.changeSection }
                    baseGridWidth={ baseGridWidth }
                    columns={ columns }
                    isMobile={ isMobile }
                    section={ section } />

                <SectionComponent
                    section={ section }
                    baseGridWidth={ baseGridWidth }
                    columns={ columns }
                    isMobile={ isMobile }
                    toggleFocusState={ this.toggleFocusState } />

            </div>

        );

    }

});

React.render(<Main />, document.getElementById('App'));