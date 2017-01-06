

import {
	IAdventure,
	IAdventureCreationParams,
	AdventureModel,
	//default_instance as _adventure_model
} from '../models/adventure'

import {
	IAdventureArchetype,
	AdventureArchetypeModel,
	//default_instance as _adventure_archetype_model
} from '../models/adventure_archetype'

import { LokiDb, factory } from '../db'
import {
	quality_related_weapon_strength_multiplier,
	quality_related_weapon_strength_spread,
	weapon_enhancement_multiplier,
	//	coins_gain_intervals,
} from './constants'
import * as consts from './constants'


////////////

interface InjectableDependencies {
	static_db: LokiDb
	adventure_model: AdventureModel
	adventure_archetype_model: AdventureArchetypeModel
	weapon_model: WeaponModel
	weapon_component_model: WeaponComponentModel
}

////////////

/*
 TODO !!!!

 item score

 item gold value

 click delay (good and bad)

 */

function create_instance(dependencies: InjectableDependencies) {
	const {
		static_db,
		adventure_model,
		adventure_archetype_model,
		weapon_model,
		weapon_component_model
	} = dependencies

	const adventure_archetype_collection = static_db.getCollection<IAdventureArchetype>(adventure_archetype_model.hid)
	const adventure_archetypes: { [k: string]: IAdventureArchetype[] } = {
		good: adventure_archetype_collection.findObjects({ good: true }),
		bad: adventure_archetype_collection.findObjects({ good: false }),
	}

	const weapon_component_collection = static_db.getCollection<IWeaponComponent>(weapon_component_model.hid)
	const weapon_components: { [k: string]: IWeaponComponent[] } = {
		base: weapon_component_collection.findObjects({ type: 'base' }),
		qualifier1: weapon_component_collection.findObjects({ type: 'qualifier1' }),
		qualifier2: weapon_component_collection.findObjects({ type: 'qualifier2' }),
		quality: weapon_component_collection.findObjects({ type: 'quality' })
	}

	function generate_random_demo_adventure(): IAdventure {
		const good = Random.bool(90)(engine)
		const archetype = Random.pick(engine, adventure_archetypes[good ? 'good' : 'bad'])

		return instantiate_adventure_archetype(engine, archetype)[0]
	}

	return {
		generate_random_demo_adventure,
		generate_random_demo_weapon,
	}
}

function get_weapon_damage_range(weapon: IWeapon): [number, number] {
	const spread = quality_related_weapon_strength_spread[weapon.quality.hid]
	const strength_multiplier = quality_related_weapon_strength_multiplier[weapon.quality.hid]
	const enhancement_multiplier = (1 + weapon_enhancement_multiplier * weapon.enhancement_level)

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
	InjectableDependencies,
	create_instance,
	get_weapon_damage_range,
	get_weapon_medium_damage,
}

////////////////////////////////////
