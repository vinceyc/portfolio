// I M P O R T
import React from 'react';

const ThumbnailComponent = React.createClass({

  propTypes: {

      data: React.PropTypes.object,
      thumbnailWidth: React.PropTypes.number,
      active: React.PropTypes.bool

  },

  render() {

    const {
      data,
      thumbnailWidth,
      thumbnailHeight,
      active,
    } = this.props;

      return (

        <div className={ active ? 'project-item active' : 'project-item' }>

          <div
            className='project-thumb'
            style={{
              height: `${ thumbnailWidth*223/280 }rem`,
              backgroundImage: 'url(/assets/development/' + data['id'] + '/thumb.jpg)'
            }}>
          </div>
          <a className='thumbnail-link'
            data-hover={ data['title'] }>
            <em>{ data['title'] }</em><br />
              { data['type'] }
          </a>

        </div>

      );
  }

});

export default ThumbnailComponent;