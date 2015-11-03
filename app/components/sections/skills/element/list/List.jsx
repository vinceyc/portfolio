// I M P O R T
import React from 'react';
import { Motion, spring } from 'react-motion';

let skillsItems;

const ListComponent = React.createClass({

  propTypes: {

    type: React.PropTypes.string,
    list: React.PropTypes.array

  },

  render() {

    const {
      type,
      list
    } = this.props;

    return (

      <ul className='list'>
      <h4 className='list-title'>{ type }</h4>

      { list.map(function(skill, i) {

        const defaultValue = {
          top: spring(4000),
          opacity: spring(0),
          lightness: spring(20)
        };

        const endValue = {
          top: spring(1+2*(i+1), [80+(i*20), 10]),
          opacity: spring(100, [80+(i*20), 10]),
          lightness: spring(100, [30+(i*2), 80]),
        };

        return (

          <Motion
            key={i}
            defaultStyle={ defaultValue }
            style={ endValue }>
          {
            values =>
              <li style={{
                top: `${values.top}em`,
                opacity: `${values.opacity}/100`,
                color: `hsl(221, 50%, ${values.lightness}%)`
              }}>

                {skill}

              </li>
          }

          </Motion>

        );

      }.bind(this))}

      </ul>

    );

  }

});

export default ListComponent;