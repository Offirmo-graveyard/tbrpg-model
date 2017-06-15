////////////////////////////////////

import { Random, Engine } from '@offirmo/random'

////////////

import { IJsonSchemaExtended } from '../_incubator/json-schema-based-model'


import {
	IWeapon,
	IWeaponCreationParams,
	WeaponModel,
} from '../models/weapon'

import {
	IWeaponComponent,
	WeaponComponentType,
	WeaponComponentModel,
} from '../models/weapon_component'

import { IItemQuality } from '../models/item_quality'

import { WeaponStaticData } from '../db/types'
import * as CONST from './constants'

////////////////////////////////////

interface WeaponGenerationSpec {
	quality_distribution_less_rare?: boolean
	//recent_components_to_avoid: any[]
	// TODO more if needed
}

////////////////////////////////////

function pick_random_quality(rng: Engine, qualities: IItemQuality[], spec?: WeaponGenerationSpec): IItemQuality {
	// TODO high qualities rarer
	return Random.pick(rng, qualities)
}

function pick_random_weapon_component(rng: Engine, components: IWeaponComponent[], spec?: WeaponGenerationSpec): IWeaponComponent {
	return Random.pick(rng, components)
}

// for demo purpose, all characteristics having the same probability + also random enhancement level
function generate_random_demo_weapon(db: WeaponStaticData, weapon_schema: IJsonSchemaExtended): IWeaponCreationParams {
	const rng: Engine = Random.engines.mt19937()
	const weapon_data: IWeaponCreationParams = {
		base: pick_random_weapon_component(rng, db.base),
		qualifier1: pick_random_weapon_component(rng, db.qualifier_1),
		qualifier2: pick_random_weapon_component(rng, db.qualifier_2),
		quality: pick_random_quality(rng, db.quality),
		base_strength: Random.integer(
				(weapon_schema.properties as any).base_strength.minimum,
				(weapon_schema.properties as any).base_strength.maximum
			)(rng),
		enhancement_level: Random.integer(
				(weapon_schema.properties as any).enhancement_level.minimum,
				(weapon_schema.properties as any).enhancement_level.maximum
			)(rng),
	}

	return weapon_data
}

function generate_weapon(db: WeaponStaticData, rng: Engine, weapon_schema: IJsonSchemaExtended): IWeaponCreationParams {
	const weapon_data: IWeaponCreationParams = {
		base: pick_random_weapon_component(rng, db.base),
		qualifier1: pick_random_weapon_component(rng, db.qualifier_1),
		qualifier2: pick_random_weapon_component(rng, db.qualifier_2),
		quality: pick_random_quality(rng, db.quality),
		base_strength: Random.integer(
			(weapon_schema.properties as any).base_strength.minimum,
			(weapon_schema.properties as any).base_strength.maximum
		)(rng),
		enhancement_level: 0,
	}

	return weapon_data
}

////////////////////////////////////

export {
	WeaponGenerationSpec,
	generate_weapon
}

////////////////////////////////////
