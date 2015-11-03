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