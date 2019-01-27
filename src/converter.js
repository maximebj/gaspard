const { Component } = wp.element
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data

class Converter extends Component {

  isQuoteOpen = false

  componentDidUpdate( lastProps, lastState ) {
    
    // When selecting a block
    if ( lastProps.block === null ) {
      return
    }
    
    // Just choosed another block
    if ( this.props.block.clientId != lastProps.block.clientId ) {
      this.isQuoteOpen = false
      return
    }

    this.convert()
  }

  convert() {
    
    const { block, updateBlockAttributes } = this.props
    const { content } = block.attributes
    
    const threechars = content.substr( -3 )
    const twochars = threechars.substr( -2 )
    const char = twochars.substr( -1 )

    var firstPart = content.substr( 0, content.length - 1 )
    var newContent = false

    switch ( char ) {
      case "'":
        newContent = firstPart + "’"
        break;
      case '"':
        if( this.isQuoteOpen ) {
          newContent = firstPart + "»"
          this.isQuoteOpen = false
        } else {
          newContent = firstPart + "«"
          this.isQuoteOpen = true
        }
        break;
    }


    firstPart = content.substr( 0, content.length - 2 )
    switch ( twochars ) {
      
      // Non breaking space
      case " ?":
        newContent = firstPart + " ?"
        break;
      case ' !':
        newContent = firstPart + " !"
        break;
      case ' ;':
        newContent = firstPart + " ;"
        break;
      case ' :':
        newContent = firstPart + " :"
        break;
    }


    firstPart = content.substr( 0, content.length - 3 )
    switch ( threechars ) {
      case "...":
        newContent = firstPart + "…"
        break;
    }

    if ( newContent ) {
      updateBlockAttributes( block.clientId, { content: newContent } )
    }
  }

  render() {
    return null
  }
  
}
  
export default compose(
  withSelect( ( select ) => ( {
    block: select( 'core/editor' ).getSelectedBlock(),
  } ) ),
  withDispatch( dispatch => ( {
    updateBlockAttributes: dispatch( 'core/editor' ).updateBlockAttributes
  } ) )
) ( Converter )