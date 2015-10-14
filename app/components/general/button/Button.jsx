// I M P O R T
import React from 'react';

const ButtonComponent = React.createClass({

  propTypes: {

      text: React.PropTypes.string,
      height: React.PropTypes.number,
      width: React.PropTypes.number

  },


  getInitialState() {
    return {
      isActive: false
    }
  },

  componentDidMount() { 

    window.addEventListener( 'mousedown', this.props.enterProject );
    window.addEventListener( 'touchstart', this.props.enterProject );

  },

  setActive() {
    this.setState({
      isActive: true
    });
  },

  handleTouchStart() {

    this.setActive();

  },

  handleMouseDown() {

    this.setActive();

  },

  render() {

    const {
      text,
      height,
      width,
      isHeading
    } = this.props;

    const {
      isActive
    } = this.state;

    let classes;
    let componentClasses;
    let spacing = 5;

    classes = isHeading ? 'menu-button text-button' : 'text-button';
    componentClasses = isActive ? 'active component-button' : 'component-button';

      return (
        <div className={ componentClasses }
          mouseDown={ this.handleMouseDown }
          onTouchStart={ this.handleTouchStart }
          style={{
            width: `${ width }rem`,
          }}>
            <svg height={ `${ height }rem` } width={ `${ width }rem` } xmlns='http://www.w3.org/2000/svg'>
                <rect className='button-shape' height={ `${ height }rem` } width={ `${ width }rem` } />
                <div
                  className={ classes }
                  data-hover={ text }
                  style={{
                    lineHeight: `${ height }rem`,
                    width: `${ width }rem`,
                    height: `${ height }rem`
                  }}>
                  { text }
                </div>
            </svg>
        </div>
    );
  }
});

export default ButtonComponent;