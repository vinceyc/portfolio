// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

// C O M P O N E N T S
import FormComponent from './element/form/Form.jsx';
import IconComponent from './../../general/icon/Icon.jsx';

let contactItems;

const ContactComponent = React.createClass({

    propTypes: {

        baseGridWidth: React.PropTypes.number,
        columns: React.PropTypes.number,
        toggleFocusState: React.PropTypes.func

    },

    componentDidMount() {



    },

  render() {

    const {
      baseGridWidth,
      columns,
      toggleFocusState
    } = this.props;

    let textColumnWidth;
    textColumnWidth = columns < 4 ? 1 : 2;
    textColumnWidth = columns <= 2 ? 2 : textColumnWidth;

    let formColumnWidth = columns - textColumnWidth;
    formColumnWidth = columns <= 2 ? 2 : formColumnWidth;

    const s0 = 200;
    const d0 = 20;

    const distance = -300;

    const profileDefaultStyle =  {
      y: spring( -distance , [s0, d0]),
      o: spring( 0 , [s0 * 0.25, d0]),
    };

    const profileStyle =  {
      y: spring( 0 , [s0, d0]),
      o: spring( 100 , [s0 * 0.25, d0]),
    };

    const formDefaultStyle =  {
      y: spring( distance , [s0, d0]),
      o: spring( 0 , [s0 * 0.25, d0]),
    };

    const formStyle =  {
      y: spring( 0 , [s0, d0]),
      o: spring( 100 , [s0 * 0.25, d0]),
    };

      return (
        <section className='component-contact'>

          <Motion defaultStyle={ profileDefaultStyle } style={ profileStyle }>
          {({x, y, o}) =>
            <div
              className='contact-profile'
              style={{
                width: `${ (baseGridWidth * textColumnWidth) - 1 }rem`,
                marginRight: `${ 1 }rem`,
                opacity: o/100,
                transform: `translate3d( 0, ${ y }px, 0)`,
                WebkitTransform: `translate3d( 0, ${ y }px, 0)`,
              }}>

              <h4>About Me</h4>

            <p>
                Thank you for visiting!  I am a front-end developer with a design background who is equally interested in both areas.  I strongly believe that greater knowledge of web development informs and enables the kind of design process necessary to build beautiful web products.
            </p>
            <p>
                This website was created using <a href='https://facebook.github.io/react/' target='_blank'>React.js</a>, <a href='https://github.com/chenglou/react-motion' target='_blank'>React Motion</a> and just a bit of <a href='http://threejs.org/' target='_blank'>Three.js</a>
            </p>

            <a className='contact-link' href='mailto:vince.ys.chan@gmail.com'>Email</a>

            <a className='contact-link' href='https://ca.linkedin.com/pub/vincent-chan/43/276/5ab'>LinkedIn</a>

            <a className='contact-link' href="vincent_chan_resume.pdf" target="_blank">Résumé</a>

            </div>
          }
        </Motion>
         <Motion defaultStyle={ formDefaultStyle } style={ formStyle }>
          {({x, y, o}) =>
            <div
              className='contact-form'
              style={{
                width: `${ baseGridWidth * formColumnWidth - 1 }rem`,
                marginRight: `${ 1 }rem`,
                opacity: o/100,
                transform: `translate3d( 0, ${ y }px, 0)`,
                WebkitTransform: `translate3d( 0, ${ y }px, 0)`,
              }}>

              <h4>Drop me a line</h4>

              <form method="post" action="contact.php">

              <FormComponent
                  type={ 'name' }
                  width={ baseGridWidth * formColumnWidth - 1 }
                  height={ 1.5 }
                  toggleFocusState={ toggleFocusState }/>

                <FormComponent
                  type={ 'email' }
                  width={ baseGridWidth * formColumnWidth - 1 }
                  height={ 1.5 }
                  toggleFocusState={ toggleFocusState }/>

                <FormComponent
                  type={ 'message' }
                  width={ baseGridWidth * formColumnWidth - 1 }
                  height={ 6 }
                  toggleFocusState={ toggleFocusState }/>

                <FormComponent
                  type={ 'submit' }
                  width={ baseGridWidth * formColumnWidth - 1 }
                  height={ 1.5 }
                  toggleFocusState={ toggleFocusState }/>

              </form>

            <p id="status" className="status"></p>

            </div>
          }
        </Motion>

        </section>
    );
  }
});

export default ContactComponent;