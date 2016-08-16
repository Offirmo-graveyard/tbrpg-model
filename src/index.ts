/* The Boring RPG model
 */

////////////////////////////////////

import * as adventure from './models/adventure'
import * as adventure_archetype from './models/adventure_archetype'
import * as saga from './models/saga'
import * as weapon from './models/weapon'
import * as weapon_component from './models/weapon_component'

import * as mechanics from './mechanics'

////////////

import i18n_en from './common/i18n/en'
import i18n_fr from './common/i18n/fr'

////////////////////////////////////

const supported_locales = ['en', 'fr']


function get_i18n_data(locale: string): Object {
	return Object.assign(
		{},
		locale === 'fr' ? i18n_fr : i18n_en,
		adventure_archetype.get_i18n_data(locale),
		weapon.get_i18n_data(locale),
		weapon_component.get_i18n_data(locale),
	)
}

////////////////////////////////////

export {
supported_locales,
get_i18n_data,

adventure,
adventure_archetype,
saga,
weapon_component,
weapon,

mechanics,
}

////////////////////////////////////
