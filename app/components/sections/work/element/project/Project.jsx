// I M P O R T
import React from 'react';
import Spring from 'react-motion';

// C O M P O N E N T S
import ButtonComponent from './../../../../general/button/Button.jsx';

// D A T A
import workData from './../../../../../data/work.js';

const ProjectComponent = React.createClass({

  propTypes: {

      idx: React.PropTypes.number,
      baseGridWidth: React.PropTypes.number,
      exitProject: React.PropTypes.func

  },

  componentDidReceiveProps() {
    console.log("[componentDidReceiveProps]");
  },

  componentDidMount() { 
    console.log("[this.props.idx] : "+this.props.idx);
  },

  render() {

    const {
      idx,
      baseGridWidth,
      exitProject
    } = this.props;

    let renderSection;


    let renderedLink = <span></span>;

    if (workData[idx]['link']) {

      renderedLink = <a href={ workData[idx]['link'] } target='_blank'>Link to Project</a>;

    }

      return (
        <section className='component-project'>

          <div
            onClick={ exitProject }
            onTouchStart={ exitProject }>

          <ButtonComponent
            text={ 'Back to Thumbnails' }
            width={ baseGridWidth }
            height={ 2 }
            isHeading={ false } />

          </div>

          <h3>
            {workData[idx]['title']}
          </h3>

          { renderedLink }

          <p>
            { workData[idx]['description'] }
          </p>

          <ul className='list'>
          <h4 className='list-title'>Built With</h4>
            {workData[idx]['tech'].map((row, i) => {
              return (<li key={ i }>{ row }</li>)
            })}
          </ul>

        </section>
      );
  }

});

export default ProjectComponent;