// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

const IconComponent = React.createClass({

  propTypes: {

      name: React.PropTypes.string,
      size: React.PropTypes.number

  },

  render() {

    const {
      name,
      size
    } = this.props;

      return (
        <div className='component-icon'></div>
    );
  }
});

export default IconComponent;