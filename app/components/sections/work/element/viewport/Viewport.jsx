// I M P O R T
import React from 'react';
import Spring from 'react-motion';

// C O M P O N E N T S
import PhoneComponent from './Phone.jsx';
import TabletComponent from './Tablet.jsx';
import DesktopComponent from './Desktop.jsx';

// D A T A

const ViewportComponent = React.createClass({

  propTypes: {

      view: React.PropTypes.string,
      width: React.PropTypes.number

  },

  componentWillMount() {

  },

  render() {

    const {
      view,
      width
    } = this.props;

    let renderedSection;

    if ( view === 'phone' ) {
        renderedSection = <PhoneComponent width={width} />;
    }
    if ( view === 'tablet' ) {
        renderedSection = <TabletComponent width={width} />;
    }
    if ( view === 'desktop' ) {
        renderedSection = <DesktopComponent width={width} />;
    }

      return (
        <section className='component-viewport'>

          { renderedSection }

        </section>
      );
  }

});

export default ViewportComponent;