const { Fragment } = wp.element
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost
const { registerPlugin } = wp.plugins
const { Component } = wp.element

import icon from './icon'
import SidebarOptions from './sidebar'
import Converter from './converter'

class LeBonFrancais extends Component {

  state = {
    conversionActive: true,
    ignoreList: 'core/code\r\ncore/html\r\nadvanced-gutenberg-blocks/code',
  }

  render() {
    return(
      <Fragment>
        <PluginSidebarMoreMenuItem
          target="lebonfrancais-sidebar"
        > 
          Le Bon Français
        </PluginSidebarMoreMenuItem>
        <PluginSidebar
          name="lebonfrancais-sidebar"
          title="Le Bon Français"
        >
          <SidebarOptions
            conversionActive={ this.state.conversionActive }
            ignoreList={ this.state.ignoreList }
            onChangeState={ conversionActive => this.setState( { conversionActive } ) }
            onChangeIgnoreList= { ignoreList => this.setState( { ignoreList } ) }
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

registerPlugin( "lebonfrancais", {
  icon: icon,
  render: LeBonFrancais,
} )