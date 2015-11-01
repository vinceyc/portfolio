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

        idx: React.PropTypes.number,
        baseGridWidth: React.PropTypes.number,
        nextProject: React.PropTypes.func,
        prevProject: React.PropTypes.func,
        exitProject: React.PropTypes.func,

    },

    render() {

    const {
        idx,
        baseGridWidth,
        nextProject,
        prevProject,
        exitProject
    } = this.props;

    let renderedLink = <span></span>;

    if (workData[idx]['link']) {

        renderedLink =
        <ul className='project-detail'>
            <h4>Link</h4>
            <li><a href={ workData[idx]['link'] } target='_blank'>{ workData[idx]['link'] }</a></li>
        </ul>;

    }

    const s1 = 40;
    const d1 = 20;

    const defaultProjectStyle = {
        o: spring( 50, [s1, d1])
    };

    const ProjectStyle = {
        o: spring(100, [s1, d1])
    };

    return (
        <Motion
            defaultStyle={ defaultProjectStyle }
            style={ ProjectStyle }>
            {({o}) => {
            return (
                <div
                style={{
                    opacity: `${ o/100 }`,
                }}>

                    <h4 className='work-title'>{ workData[idx]['title'] }
                        <span className='thumbnails-button'
                        onClick={ exitProject }
                        onTouchStart={ exitProject }>
                            all projects
                        </span>
                    </h4>

                    { renderedLink }

                    <ul className='project-detail'>
                        <h4>Built With</h4>
                        {workData[idx]['tech'].map((row, i) => {
                            return (<li key={ i }>{ row }</li>)
                        })}
                    </ul>

                    <ul className='project-detail'>
                        <h4>Description</h4>
                        <li>{ workData[idx]['description'] }</li>
                    </ul>

                </div>
            );
            }}
        </Motion>
    );

    }

});

export default ProjectComponent;