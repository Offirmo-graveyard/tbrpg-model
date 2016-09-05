////////////////////////////////////

import { IWeapon } from '../models/weapon'
import * as consts from './constants'

////////////////////////////////////
/*
 TODO !!!!

 item score

 item gold value

 */


function get_weapon_damage_range(weapon: IWeapon): [number, number] {
	const spread = consts.quality_related_weapon_strength_spread[weapon.quality.hid]
	const strength_multiplier = consts.quality_related_weapon_strength_multiplier[weapon.quality.hid]
	const enhancement_multiplier = (1 + consts.weapon_enhancement_multiplier * weapon.enhancement_level)

	// constrain interval
	const min_strength = Math.max(weapon.base_strength - spread, 1)
	const max_strength = Math.min(weapon.base_strength + spread, 20)

	return [
		Math.round(min_strength * strength_multiplier * enhancement_multiplier),
		Math.round(max_strength * strength_multiplier * enhancement_multiplier)
	]
}

function get_weapon_medium_damage(weapon: IWeapon): number {
	const damage_range = get_weapon_damage_range(weapon)
	return (damage_range[0] + damage_range[1]) / 2
}

////////////////////////////////////

export {
	get_weapon_damage_range,
	get_weapon_medium_damage,
}

////////////////////////////////////
