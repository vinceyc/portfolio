// R E Q U I R E

'use strict';

var React = require('react');
var TweenMax = require('TweenMax');
var ReactMotion = require('react-motion');

// C O M P O N E N T S
var ContentComponent = require('./components/Content.jsx');
var BackgroundComponent = require('./components/Background.jsx');
var typeset = require('typeset');

// M O D E L
var Data = require('./data/menu.js');

var menuItems;

var Stage = React.createClass({
    displayName: 'Stage',

    getInitialState: function getInitialState() {

        return {
            section: 'home',
            open: false
        };
    },

    changeSection: function changeSection(key) {

        this.setState({ section: key });
    },

    enterProject: function enterProject(i) {

        React.findDOMNode(this.refs.project).className = 'project-container toggled';
        React.findDOMNode(this.refs.project).innerHTML = devItems[i]['title'];
    },

    componentDidMount: function componentDidMount() {

        TweenMax.staggerFrom('.menu-item', 2, { opacity: 0, delay: 0.25, ease: Elastic.easeOut }, 0.1);
    },

    render: function render() {

        menuItems = menuData.map(function (key, i) {

            return React.createElement(
                'li',
                { className: 'menu-item', key: i },
                React.createElement(
                    'a',
                    { onClick: this.changeSection.bind(this, key['ref']), className: 'menu-link', 'data-hover': key['text'] },
                    typeset(key['text'])
                )
            );
        }, this);

        return React.createElement(
            'div',
            { className: 'wrapper' },
            React.createElement(
                'ul',
                { id: 'menu', className: 'menu' },
                menuItems
            ),
            React.createElement(ContentComponent, { section: this.state.section })
        );
    }

});

React.render(React.createElement(Stage, null), document.getElementById('App'));