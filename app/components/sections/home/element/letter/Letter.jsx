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
          }}>
            <svg height={ `${ height }rem` } width={ `${ width }rem` } xmlns='http://www.w3.org/2000/svg'>
                <rect className='letter-shape' height={ `${ height }rem` } width={ `${ width }rem` } />
                <div
                  className={ 'letter' }
                  style={{
                    lineHeight: `${ height }rem`,
                    width: `${ width }rem`,
                    height: `${ height }rem`,
                    fontSize: `${ height*0.25 }rem`
                  }}>
                  { text }
                </div>
            </svg>
        </div>

      );
  }

});

export default LetterComponent;