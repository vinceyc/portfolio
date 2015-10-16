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
                className='close-button'
                onClick={ exitProject }
                onTouchStart={ exitProject }>

              <ButtonComponent
                text={ 'esc' }
                width={ 3 }
                height={ 2 }
                keycode={ 0 }
                isHeading={ false } />

            </div>
            <h2>{ workData[projectIndex]['title'] }</h2>
            <h4>{ workData[projectIndex]['description'] }</h4>

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
                projectIndex={ projectIndex }
                projectData={ workData[projectIndex] }
                view={ workData[projectIndex]['view'] }
                baseGridWidth={ baseGridWidth } />

          </div>

        </section>
      );
  }

});

export default ProjectComponent;