// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

// C O M P O N E N T S
import HomeComponent       from './home/Home.jsx';
import WorkComponent       from './work/Work.jsx';
import SkillsComponent     from './skills/Skills.jsx';
import ContactComponent    from './contact/Contact.jsx';

const SectionComponent = React.createClass({

  propTypes: {

    section: React.PropTypes.string,
    baseGridWidth: React.PropTypes.number

  },

  render() {

    const {
      section,
      baseGridWidth
    } = this.props;

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

        <div>{ renderedSection }</div>

    );
  }
});

export default SectionComponent;