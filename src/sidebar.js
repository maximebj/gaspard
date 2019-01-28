const { Fragment } = wp.element
const { Component } = wp.element
const { PanelBody, ToggleControl, TextareaControl } = wp.components

class SidebarOptions extends Component {

  render() { 

    const { conversionActive, ignoreList, lang, onChangeState, onChangeIgnoreList } = this.props
 
    return (
      <Fragment>
        <PanelBody>
          <p className="components-menu-item__info">
            « Je convertis automatiquement les apostrophes, guillemets… leurs équivalents Français et ajoute des espaces insécables avant les doubles ponctuations. »
          </p>
          <ToggleControl
            label="Conversion activée"
            checked={ conversionActive }
            onChange={ () => onChangeState( ! conversionActive ) }
          />
          { typeof lang !== "undefined" && lang != 'fr' && (
            <p className="components-menu-item__info">🛑 <em>La langue de cette page n'est pas le Français. La conversion a été désactivée.</em></p>
          ) }
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
            value={ ignoreList }
            onChange={ ignoreList  => onChangeIgnoreList( ignoreList ) }
          />
        </PanelBody>
      </Fragment>
    )

  }
}

export default SidebarOptions