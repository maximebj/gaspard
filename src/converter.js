const { Component } = wp.element
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data

class Converter extends Component {

  isQuoteOpen = false
  lastAttributes = false

  componentDidUpdate( lastProps, lastState ) {
    
    // If LBF is disabled
    if ( ! this.props.conversionActive ) {
      return
    }
    
    // Check for changes in the title
    if( this.props.postTitle != lastProps.postTitle ) {
      
      const newTitle = this.convert( this.props.postTitle )
    
      if( newTitle != this.props.postTitle ) {
        this.props.editPost( { title: newTitle } )
      } 
    } 

    // When selecting a first block or something else (title)
    if ( lastProps.block === null || this.props.block === null ) {
      return
    }
  
    // Just choosed another block
    if ( this.props.block.clientId != lastProps.block.clientId ) {
      this.isQuoteOpen = false
      this.lastAttributes = this.props.block.attributes
      return
    }

    // Provisionnal
    // if( ! this.props.block.attributes.hasOwnProperty('content') ) {
    //   return
    // }

    // console.log( this.props.block )
    
    // const { block, updateBlockAttributes } = this.props
    // const { content } = block.attributes
    
    

    // if ( newString ) {
    //   updateBlockAttributes( block.clientId, { content: newString } )
    // }

    // this.lastAttributes = this.props.block.attributes
  }

  convert( string ) {

    const threechars = string.substr( -3 )
    const twochars = threechars.substr( -2 )
    const char = twochars.substr( -1 )

    var firstPart = string.substr( 0, string.length - 1 )
    var newString = string

    switch ( char ) {
      case "'":
        newString = firstPart + "’"
        break;
      case '"':
        if( this.isQuoteOpen ) {
          newString = firstPart + "»"
          this.isQuoteOpen = false
        } else {
          newString = firstPart + "«"
          this.isQuoteOpen = true
        }
        break;
    }


    firstPart = string.substr( 0, string.length - 2 )
    switch ( twochars ) {
      
      // Non breaking space
      case " ?":
        newString = firstPart + " ?"
        break;
      case ' !':
        newString = firstPart + " !"
        break;
      case ' ;':
        newString = firstPart + " ;"
        break;
      case ' :':
        newString = firstPart + " :"
        break;
    }


    firstPart = string.substr( 0, string.length - 3 )
    switch ( threechars ) {
      case "...":
        newString = firstPart + "…"
        break;
    }

    return newString
  }

  render() {
    return null
  }
  
}
  
export default compose(
  withSelect( ( select ) => ( {
    block: select( 'core/editor' ).getSelectedBlock(),
    postTitle: select( 'core/editor' ).getEditedPostAttribute( 'title' ),
  } ) ),
  withDispatch( dispatch => ( {
    updateBlockAttributes: dispatch( 'core/editor' ).updateBlockAttributes,
    editPost: dispatch( 'core/editor' ).editPost,
  } ) )
) ( Converter )