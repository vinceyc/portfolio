// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

const FormComponent = React.createClass({

  propTypes: {
      type: React.PropTypes.string,
      text: React.PropTypes.string,
      height: React.PropTypes.number,
      width: React.PropTypes.number,
      toggleFocusState: React.PropTypes.func
  },

  getInitialState() {
    return {
      isActive: false,
      value: ''
    }
  },

  handleChange(e) {
    this.setState({value: e.target.value});
    e.preventDefault();
  },

  handleOnSubmit(e) {
    alert('it works!');
    e.preventDefault();
  },

  componentDidMount() { 
    window.addEventListener( 'mousedown', this.props.handleMouseDown );
    window.addEventListener( 'touchstart', this.props.handleTouchStart );
  },

  setActive() {
    this.setState({
      isActive: true
    });
  },

  handleOnFocus() {

    this.setActive();
    this.props.toggleFocusState(true);

  },

  handleOnBlur() {
    this.setState({
      isActive: false
    });
    this.props.toggleFocusState(false);
  },

  handleTouchStart() {

    this.setActive();

  },

  handleMouseDown() {

    this.setActive();

  },

  render() {

    const {
      type,
      text,
      height,
      width
    } = this.props;

    const {
      isActive,
      value
    } = this.state;

    let componentClasses;
    let labelClasses;
    let formValue;
    let formLabel;
    let formElement;

    const s0 = 175;
    const d0 = 25;
    const labelWidth = 4.5;

    const svgStyle = isActive ? {
        h: spring( 221, [s0, d0]),
        s: spring( 50, [s0, d0]),
        l: spring( 45, [s0, d0]),
        strokeWidth: spring( 3, [s0, d0]),
        strokeDashoffset: spring( 0 , [s0, d0]),
        strokeDasharray: spring( 0.25, [s0, d0]),
        opacity: spring( 1, [s0, d0]),
    } : {
        h: spring( 221, [s0, d0]),
        s: spring( 50, [s0, d0]),
        l: spring( 100, [s0, d0]),
        strokeWidth: spring( 3, [s0, d0]),
        strokeDashoffset: spring( 1000 , [s0, d0]),
        strokeDasharray: spring( 500, [s0, d0]),
        opacity: spring( 0, [s0, d0]),
    };

    const svgDefaultStyle = {
        h: spring( 221, [s0, d0]),
        s: spring( 50, [s0, d0]),
        l: spring( 100, [s0, d0]),
        strokeWidth: spring( 3, [s0, d0]),
        strokeDashoffset: spring( 0 , [s0, d0]),
        strokeDasharray: spring( 0.25, [s0, d0]),
        opacity: spring( 0, [s0, d0]),
    };

    const formStyles = (type === 'submit') ? {
      width: `${ width - 0 - labelWidth }rem`,
      height: `${ height - 0.5 }rem`,
      marginLeft: `${ labelWidth }rem`,
    } : {
      width: `${ width - 1 - labelWidth }rem`,
      height: `${ height - 0.5 }rem`,
      marginLeft: `${ labelWidth }rem`,
    };

    const svgDimensions = {
      width: `${ width - labelWidth }rem`,
      marginLeft: `${ labelWidth }rem`,
      height: `${ height }rem`,
      position: `absolute`,
      bottom: `0`
    };

    formValue = value;

    if (type === 'name')
    {
      formElement =
        <input
          type='text'
          name={ type }
          defaultValue='Name:'
          onBlur={ this.handleOnBlur }
          onFocus={ this.handleOnFocus }
          onChange={ this.handleChange }
          value={ formValue }
          style={ formStyles } />;
    }
    else if (type === 'email')
    {
      formElement =
        <input
          type='text'
          name={ type }
          defaultValue='E-mail:'
          onBlur={ this.handleOnBlur }
          onFocus={ this.handleOnFocus }
          onChange={ this.handleChange }
          value={ formValue }
          style={ formStyles } />;
    }
    else if (type === 'message')
    {
      formElement =
        <textarea
          name={ type }
          defaultValue='Message:'
          onBlur={ this.handleOnBlur }
          onFocus={ this.handleOnFocus }
          onChange={ this.handleChange }
          value={ formValue }
          style={ formStyles } />;
    }
    else if (type === 'submit')
    {
      formElement =
        <input
          onBlur={ this.handleOnBlur }
          onFocus={ this.handleOnFocus }
          type='submit'
          id={ type }
          defaultValue={ type }
          value='Submit'
          style={ formStyles } />;
    }

    componentClasses = isActive ? 'active component-form' : 'component-form';
    labelClasses = isActive ? `active ${ type }` : `${ type }`;

      return (
        <div className={ componentClasses }
          mouseDown={ this.handleMouseDown }
          onTouchStart={ this.handleTouchStart }
          style={{
            width: `${ width }rem`,
            position: `relative`,
            height: `${ height }rem`
          }}>
            <label className={ labelClasses } htmlFor={ type }>{ type }</label>
            <Motion defaultStyle={ svgDefaultStyle } style={ svgStyle }>
              {({
                h,
                l,
                s,
                strokeWidth,
                strokeDashoffset,
                strokeDasharray,
                opacity
              }) =>
                <svg style={ svgDimensions }>
                  <rect
                    fill='transparent'
                    opacity={ `${ opacity }` }
                    stroke={ `hsl(${ h }, ${ s }%, ${ l }%)` }
                    strokeWidth={ `${ strokeWidth }px` }
                    strokeDashoffset={ `${ strokeDashoffset }` }
                    strokeDasharray={ `${ strokeDasharray }` }
                    height={ `${ height }rem` } width={ `${ width - labelWidth }rem` } />
                </svg>
              }
            </Motion>
            { formElement }
        </div>
    );
  }
});

export default FormComponent;