// I M P O R T
import React from 'react';
import {Motion, spring} from 'react-motion';

// C O M P O N E N T S
import ButtonComponent from './../../../../general/button/Button.jsx';
import ViewportComponent from './../viewport/Viewport.jsx';

// D A T A
import workData from './../../../../../data/work.js';

const ProjectComponent = React.createClass({

  propTypes: {
    projectIndex: React.PropTypes.number,
    baseGridWidth: React.PropTypes.number,
    exitProject: React.PropTypes.func,
    view: React.PropTypes.string
  },

  render() {

    const {
      projectIndex,
      baseGridWidth,
      exitProject,
      view
    } = this.props;

    let renderSection;
    let renderedLink = <span></span>;

    if (workData[projectIndex]['link']) {

      renderedLink = <a href={ workData[projectIndex]['link'] } target='_blank'>Link to Project</a>;

    }

      return (
        <section className='component-project'>

            <div
                onClick={ exitProject }
                onTouchStart={ exitProject }>

              <ButtonComponent
                text={ '<' }
                width={ 2 }
                height={ 2 }
                isHeading={ false } />

            </div>
            <h3>


              {workData[projectIndex]['title']}
            </h3>

          <div
            className='column'
            style={{
              width: `${ baseGridWidth - 1 }rem`,
              marginRight: `${ 1 }rem`
            }}>


              { renderedLink  }

              <p>
                { workData[projectIndex]['description'] }
              </p>

              <ul className='list'>
              <h4 className='list-title'>Built With</h4>
                {workData[projectIndex]['tech'].map((row, i) => {
                  return (<li key={ i }>{ row }</li>)
                })}
              </ul>

          </div>

          <div
            className='column'
            style={{
              width: `${ baseGridWidth*3 }rem`,
            }}>
              <ViewportComponent
                projectData={ workData[projectIndex] }
                view={ workData[projectIndex]['view'] }
                baseGridWidth={ baseGridWidth } />

          </div>

        </section>
      );
  }

});

export default ProjectComponent;