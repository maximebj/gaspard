const { Fragment } = wp.element
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost
const { registerPlugin } = wp.plugins
const { Component } = wp.element
const { withSelect } = wp.data

import icon from './icon'
import SidebarOptions from './sidebar'
import Converter from './converter'

class Gaspard extends Component {

  state = {
    conversionActive: true,
    ignoreList: ['core/code', 'core/html', 'advanced-gutenberg-blocks/code'],
  }

  componentDidUpdate( lastProps, lastState) {

    // Disable conversion if Polylang Pro is enabled and lang is not French
    if( typeof this.props.lang !== "undefined" && this.props.lang != lastProps.lang && this.props.lang != "fr" ) {
      this.setState( { conversionActive: false } )
    }
  }

  updateIgnoreList( ignoreList ) {
    ignoreList = ignoreList.split('\n')
    
    // TODO : save in options

    this.setState( { ignoreList } )
  }

  render() {
    return(
      <Fragment>
        <PluginSidebarMoreMenuItem
          target="lebonfrancais-sidebar"
        > 
          Gaspard
        </PluginSidebarMoreMenuItem>
        <PluginSidebar
          name="lebonfrancais-sidebar"
          title="Gaspard"
        >
          <SidebarOptions
            conversionActive={ this.state.conversionActive }
            ignoreList={ this.state.ignoreList.join('\n') }
            lang={ this.props.lang }
            onChangeState={ conversionActive => this.setState( { conversionActive } ) }
            onChangeIgnoreList= { ignoreList => this.updateIgnoreList( ignoreList ) }
          />
        </PluginSidebar>
        <Converter
          conversionActive={ this.state.conversionActive }
          ignoreList={ this.state.ignoreList }
        />
      </Fragment>
    )
  }
}

registerPlugin( "gaspard", {
  icon: icon,
  render: withSelect( ( select ) => ( {
    lang: select( 'core/editor' ).getEditedPostAttribute( 'lang' ),
  } ) ) ( Gaspard ),
} )