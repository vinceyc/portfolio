// I M P O R T
import React from 'react';

// C O M P O N E N T S
import HomeComponent       from './home/Home.jsx';
import WorkComponent       from './work/Work.jsx';
import SkillsComponent     from './skills/Skills.jsx';
import ContactComponent    from './contact/Contact.jsx';

const SectionComponent = React.createClass({

    getInitialState() {
        return {
            isTransitioning: true
        }
    },

  propTypes: {

    section: React.PropTypes.string,
    baseGridWidth: React.PropTypes.number,
    columns: React.PropTypes.number,
    toggleFocusState: React.PropTypes.func,
    isMobile: React.PropTypes.bool,
    completeTransition: React.PropTypes.func

  },

  componentWillReceiveProps() {

    this.setState({
      isTransitioning: true
    });

  },

  completeTransition() {

      this.setState({
          isTransitioning: false
       });

  },

  render() {

    const {
      isTransitioning
    } = this.state;

    const {
      section,
      baseGridWidth,
      columns,
      toggleFocusState,
      isMobile
    } = this.props;

    let renderedSection;

    if ( section === 'home' ) {
        renderedSection = <HomeComponent
        section={ section }
        columns={ columns }
        completeTransition={ this.completeTransition }
        baseGridWidth={ baseGridWidth } />
    }
    if ( section === 'work' ) {
        renderedSection = <WorkComponent
        section={ section }
        columns={ columns }
        isMobile={ isMobile }
        completeTransition={ this.completeTransition }
        baseGridWidth={ baseGridWidth } />
    }
    if ( section === 'skills' ) {
        renderedSection = <SkillsComponent
        section={ section }
        columns={ columns }
        completeTransition={ this.completeTransition }
        baseGridWidth={ baseGridWidth } />
    }
    if ( section === 'contact' ) {
        renderedSection = <ContactComponent
        section={ section }
        columns={ columns }
        baseGridWidth={ baseGridWidth }
        completeTransition={ this.completeTransition }
        toggleFocusState={ toggleFocusState } />
    }

    return (
      <div
        className='section'
        style={{
            width: `${ baseGridWidth * columns }rem`,
        }}>
        { renderedSection }
      </div>
    );
  }
});

export default SectionComponent;