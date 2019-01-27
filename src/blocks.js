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
    ignoreList: ['core/code', 'core/html', 'advanced-gutenberg-blocks/code'],
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
          Le Bon Français
        </PluginSidebarMoreMenuItem>
        <PluginSidebar
          name="lebonfrancais-sidebar"
          title="Le Bon Français"
        >
          <SidebarOptions
            conversionActive={ this.state.conversionActive }
            ignoreList={ this.state.ignoreList.join('\n') }
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

registerPlugin( "lebonfrancais", {
  icon: icon,
  render: LeBonFrancais,
} )