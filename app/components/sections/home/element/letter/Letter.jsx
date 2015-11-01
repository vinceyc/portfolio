// I M P O R T
import React from 'react';

const LetterComponent = React.createClass({

  propTypes: {

      text: React.PropTypes.string,
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      active: React.PropTypes.bool

  },

  render() {

    const {
      text,
      width,
      height,
      active,
    } = this.props;

      return (

        <div
          className={ active ? 'active component-letter' : 'component-letter' }
          style={{
            width: `${ width }rem`,
            height: `${ height }rem`
          }}>
                <div
                  className={ 'letter' }
                  style={{
                    lineHeight: `${ height }rem`,
                    fontSize: `${ height*1/2 }rem`
                  }}>
                  { text }
                </div>
        </div>

      );
  }

});

export default LetterComponent;