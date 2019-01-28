<?php
/**
 * Plugin Name: Gaspard –– Convertisseur en Bon Français
 * Plugin URI: https://github.com/maximebj/gaspard
 * Description: Gaspard convertit automatiquement les apostrophes, guillemets, points de suspensions en leurs équivalents Français lors de la saisie. Il ajoute également des espaces insécables avant les doubles ponctuations. À votre service ! 
 * Author: maximebj, audrasjb
 * Author URI: https://dysign.fr
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function gaspard_editor_assets() {
	
	wp_enqueue_script(
		'gaspard-cgb-block-js', 
		plugins_url( '/dist/blocks.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-edit-post' ),
		true
	);

	// wp_enqueue_style(
	// 	'gaspard-cgb-block-editor-css', 
	// 	plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
	// 	array( 'wp-edit-blocks' ) 
	// );
}
add_action( 'enqueue_block_editor_assets', 'gaspard_editor_assets' );