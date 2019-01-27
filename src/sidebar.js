const { Fragment } = wp.element
const { Component } = wp.element
const { PanelBody, ToggleControl, TextareaControl } = wp.components
const { compose } = wp.compose
const { withSelect, withDispatch } = wp.data

class SidebarOptions extends Component {

  state = {
    active: true,
    ignoreList: 'core/code\r\ncore/html\r\nadvanced-gutenberg-blocks/code',
  }

  render() { 

    return (
      <Fragment>
        <PanelBody>
          <p className="components-menu-item__info">
            « Je convertis automatiquement les apostrophes, guillemets… leurs équivalents Français et ajoute des espaces insécables avant les doubles ponctuations. »
          </p>
          <ToggleControl
            label="Conversion activée"
            checked={ this.state.active }
            onChange={ () => this.setState( { active : ! this.state.active } ) }
          />
        </PanelBody>
        <PanelBody
          title="Conversions disponibles"
        >
          <ul>
            <li>• Apostrophes : <strong>'</strong> vers <strong>’</strong></li>
            <li>• Guillemets : <strong>" "</strong> vers <strong>« »</strong></li>
            <li>• Points de suspension : <strong>...</strong> vers <strong>…</strong></li>
          </ul>
        </PanelBody>
        <PanelBody
          title="Options supplémentaires"
        >
          <TextareaControl
            label="Blocs à ignorer"
            help="Le contenu de ces blocs restera intact afin d’éviter des conflits"
            value={ this.state.ignoreList }
            onChange={ ignoreList  => co( { ignoreList } ) }
          />
        </PanelBody>
      </Fragment>
    )

  }
}

export default compose(
  withSelect( ( select ) => ( {
    block: select( 'core/editor' ).getSelectedBlock(),
  } ) ),
  withDispatch( dispatch => ( {
    updateBlockAttributes: dispatch( 'core/editor' ).updateBlockAttributes
  } ) )
) ( SidebarOptions )