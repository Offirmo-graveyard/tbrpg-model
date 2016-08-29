////////////////////////////////////

//import * as _ from 'lodash'
import { Random } from '@offirmo/random'

////////////

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

import {
	IWeapon,
	IWeaponCreationParams,
	WeaponModel,
	//default_instance as _weapon_model
} from '../models/weapon'

import {
	IWeaponComponent,
	WeaponComponentType,
	WeaponComponentModel,
	//default_instance as _weapon_component_model
} from '../models/weapon_component'

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

////////////////////////////////////

/*
const engine = Random.engines.mt19937()
engine.autoSeed()
*/

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

	// pick a random component of given type
	function pick_random_weapon_component(random: number, type: WeaponComponentType): IWeaponComponent {
		const random_id = getRandomIndex(random, weapon_components[type].length)
		return weapon_components[type][random_id]
	}

	function instantiate_adventure_archetype(engine: any, aa: IAdventureArchetype): [IAdventure, number] {
		let random_use_count = 0
		const gains = aa.post.gains
		const adventure_data: IAdventureCreationParams = {
			archetype_hid: aa.hid,
			good: aa.good,
			gains: {
				level: gains.level ? 1 : 0,
				health: gains.health | 0,
				mana: gains.mana | 0,
				strength: gains.strength | 0,
				agility: gains.agility | 0,
				vitality: gains.vitality | 0,
				wisdom: gains.wisdom | 0,
				luck: gains.luck | 0,
				coins: 0, // for now, see below
				tokens: gains.tokens | 0,
				weapon: null,
				armor: null,
				improved_weapon_index: null,
				improved_armor_index: null,
			}
		}

		if (gains.coins !== 'none') {
			//			const interval = (coins_gain_intervals[gains.coins]) as [number, number]
			const interval = consts.coins_gain_intervals[gains.coins]
			adventure_data.gains.coins = Random.integer(interval[0], interval[1])(engine), ++random_use_count
		}

		return [
			adventure_model.create(adventure_data),
			random_use_count
		]
	}

	function generate_random_demo_adventure(): IAdventure {
		const good = Random.bool(90)(engine)
		const archetype = Random.pick(engine, adventure_archetypes[good ? 'good' : 'bad'])

		return instantiate_adventure_archetype(engine, archetype)[0]
	}

	function generate_random_demo_weapon(): IWeapon {
		const weapon_data: IWeaponCreationParams = {
			base: pick_random_weapon_component(Math.random(), 'base'),
			qualifier1: pick_random_weapon_component(Math.random(), 'qualifier1'),
			qualifier2: pick_random_weapon_component(Math.random(), 'qualifier2'),
			quality: pick_random_weapon_component(Math.random(), 'quality'),
			base_strength: getRandomIntInclusive(
				Math.random(),
				(weapon_model.schema.properties as any).base_strength.minimum,
				(weapon_model.schema.properties as any).base_strength.maximum
			),
			enhancement_level: getRandomIntInclusive(
				Math.random(),
				(weapon_model.schema.properties as any).enhancement_level.minimum,
				(weapon_model.schema.properties as any).enhancement_level.maximum
			),
		}

		return weapon_model.create(weapon_data)
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
