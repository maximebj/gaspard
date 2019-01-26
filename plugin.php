<?php
/**
 * Plugin Name: Le bon Français
 * Plugin URI: https://github.com/maximebj/le-bon-francais
 * Description: L’extension indispensable pour les rédacteurs Français : applique automatiquement les espaces insécables, guillemets et apostrophes à la française dans vos textes. Compatible Gutenberg
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

require_once plugin_dir_path( __FILE__ ) . 'src/init.php';