// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

let contactItems;

const ContactComponent = React.createClass({

  propTypes: {

    section: React.PropTypes.string,
    baseGridWidth: React.PropTypes.number

  },

  render() {

    const {
      section,
      baseGridWidth
    } = this.props;

    const s0 = 300;
    const d0 = 102;

    const distance = -1000;

    const profileDefaultStyle =  {
      y: spring( -distance , [s0, d0]),
      o: spring( 0 , [s0, d0]),
    };

    const profileStyle =  {
      y: spring( 0 , [s0, d0]),
      o: spring( 100 , [s0, d0]),
    };

    const formDefaultStyle =  {
      y: spring( distance , [s0, d0]),
      o: spring( 0 , [s0, d0]),
    };

    const formStyle =  {
      y: spring( 0 , [s0, d0]),
      o: spring( 100 , [s0, d0]),
    };

      return (
        <section className='section component-contact'>

          <Motion defaultStyle={ profileDefaultStyle } style={ profileStyle }>
          {({x, y, o}) =>
            <div
              className='contact-profile'
              style={{
                width: `${ baseGridWidth }rem`,
                opacity: o/100,
                transform: `translate3d( 0, ${ y }px, 0)`,
                WebkitTransform: `translate3d( 0, ${ y }px, 0)`,
              }}>

              <h4>Contact Information</h4>


              <p>Thanks for visiting! I’m a young designer currently based in Toronto who graduated from OCAD University in 2012 with a Bachelor of Design. At the core of my work, unified and honest design are used to communicate ideas and create visual solutions. As an ideal, I believe that truly special design can take what people care about and make it relevant to others. I hope you see in my work that I strive to make this my focus.
              </p>

              <a className='contact-link' href='mailto:vince.ys.chan@gmail.com'>Email</a>
              <a className='contact-link' href='https://ca.linkedin.com/pub/vincent-chan/43/276/5ab'>LinkedIn</a>
              <a className='contact-link'>Resume</a>

            </div>
          }
        </Motion>
         <Motion defaultStyle={ formDefaultStyle } style={ formStyle }>
          {({x, y, o}) =>
            <div
              className='contact-form'
              style={{
                width: `${ baseGridWidth*2 }rem`,
                opacity: o/100,
                transform: `translate3d( 0, ${ y }px, 0)`,
                WebkitTransform: `translate3d( 0, ${ y }px, 0)`,
              }}>

              <h4>A Bit About Myself</h4>


              <p>Thanks for visiting! I’m a young designer currently based in Toronto who graduated from OCAD University in 2012 with a Bachelor of Design. At the core of my work, unified and honest design are used to communicate ideas and create visual solutions. As an ideal, I believe that truly special design can take what people care about and make it relevant to others. I hope you see in my work that I strive to make this my focus.
              </p>

              <a className='contact-link' href='mailto:vince.ys.chan@gmail.com'>Email</a>
              <a className='contact-link' href='https://ca.linkedin.com/pub/vincent-chan/43/276/5ab'>LinkedIn</a>
              <a className='contact-link'>Resume</a>

            </div>
          }
        </Motion>

        </section>
    );
  }
});

export default ContactComponent;