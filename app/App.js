"use_strict"

// I M P O R T
import React from 'react';
import {Spring} from 'react-motion';
React.initializeTouchEvents(true);

// C O M P O N E N T S
import NavComponent from './components/general/navigation/Navigation.jsx';

import HomeComponent       from './components/sections/home/Home.jsx';
import WorkComponent       from './components/sections/work/Work.jsx';
import SkillsComponent     from './components/sections/skills/Skills.jsx';
import ContactComponent    from './components/sections/contact/Contact.jsx';

const baseGridWidth = 7;

const Main = React.createClass({

    getInitialState() {
        return {
            section: 'work',
            isTransitioning: false
        }
    },

    componentWillMount() {

    },

    changeSection(key) {

        if (key !== this.state.section) {
            this.setState({
                section: key,
                isTransitioning: true
             });

            console.log('isTransitioning');
        }
        event.preventDefault();

    },

    render(){

        const {
            section,
            isTransitioning
        } = this.state;

        let renderedSection;

        if ( section === 'home' ) {
            renderedSection = <HomeComponent section={ section } baseGridWidth={ baseGridWidth } />;
        }
        if ( section === 'work' ) {
            renderedSection = <WorkComponent section={ section } baseGridWidth={ baseGridWidth } />;
        }
        if ( section === 'skills' ) {
            renderedSection = <SkillsComponent section={ section } baseGridWidth={ baseGridWidth } />;
        }
        if ( section === 'contact' ) {
            renderedSection = <ContactComponent section={ section } baseGridWidth={ baseGridWidth } />;
        }

        return (

            <div id='wrapper' className='wrapper'>

                <NavComponent
                    className='component-navigation'
                    changeSection={ this.changeSection }
                    baseGridWidth={ baseGridWidth }
                    isTransitioning={ isTransitioning }
                    section={ section } />

                { renderedSection }

            </div>

        );

    }

});

React.render(<Main />, document.getElementById('App'));