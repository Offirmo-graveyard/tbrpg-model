/* The Boring RPG model
 */

////////////////////////////////////

import * as weapon from './weapon'
import * as weapon_component from './weapon_component'

////////////////////////////////////

const supported_locales = [ 'en', 'fr' ]


function get_i18n_data (locale: string): Object {
	return Object.assign(
		{},
		weapon.get_i18n_data(locale),
		weapon_component.get_i18n_data(locale),
	)
}

////////////////////////////////////

export {
	supported_locales,
	get_i18n_data,

	weapon_component,
	weapon,
}

////////////////////////////////////
