const { Fragment } = wp.element
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost
const { registerPlugin } = wp.plugins

import icon from './icon'
import SidebarOptions from './sidebar'
import Converter from './converter'

const Component = () => (
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
      <SidebarOptions/>
    </PluginSidebar>
    <Converter/>
  </Fragment>
)

registerPlugin( "lebonfrancais", {
  icon: icon,
  render: Component,
} )