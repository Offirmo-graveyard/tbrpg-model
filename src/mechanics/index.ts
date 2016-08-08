////////////////////////////////////

import * as _ from 'lodash'

////////////

import { getRandomIndex, getRandomIntInclusive } from '../utils/pure_random'

import { IWeapon, IWeaponCreationParams, WeaponModel, default_instance as _weapon_model } from '../weapon'
import { IWeaponComponent, WeaponComponentType, WeaponComponentModel, default_instance as _weapon_component_model } from '../weapon_component'
import { LokiDB,	create_static_db_instance } from '../db'

////////////

export interface InjectableDependencies {
	static_db?: LokiDB
	weapon_component_model?: WeaponComponentModel
	weapon_model?: WeaponModel
}

////////////


////////////////////////////////////


/*
 TODO !!!!

 item score

 item gold value

 click delay (good and bad)

 */

function create_instance (dependencies: InjectableDependencies = {}) {
	const static_db = (dependencies.static_db || create_static_db_instance()) as LokiDB
	const weapon_component_model = (dependencies.weapon_component_model || _weapon_component_model) as WeaponComponentModel
	const weapon_model = (dependencies.weapon_model || _weapon_model) as WeaponModel
	/*
	const dynamic_db = (dependencies.dynamic_db || new Loki('loki_dynamic.json')) as LokiDB
	const weapon_component_static_data = (dependencies.weapon_component_static_data || _weapon_component_static_data) as IWeaponComponentCreationParams[]

	const weapon_component_collection = static_db.addCollection<IWeaponComponent>(weapon_component_model.schema.offirmo_extensions.hid)
	weapon_component_collection.insert(weapon_component_static_data.map(weapon_component_model.create))
	console.log(weapon_component_collection.get(1))
	console.log(weapon_component_collection.find({type: 'base'}))*/

	const weapon_component_collection = static_db.getCollection<IWeaponComponent>(weapon_component_model.hid)

	const weapon_components: { [k: string]: IWeaponComponent[] } = {
		base: weapon_component_collection.findObjects({type: 'base'}),
		qualifier1: weapon_component_collection.findObjects({type: 'qualifier1'}),
		qualifier2: weapon_component_collection.findObjects({type: 'qualifier2'}),
		quality: weapon_component_collection.findObjects({type: 'quality'})
	}

	// pick a random component of given type
	function pick_random_weapon_component (random: number, type: WeaponComponentType): IWeaponComponent {
		//const weapon_components_matching_type = weapon_components[type] as IWeaponComponent[]
		const random_id = getRandomIndex(random, weapon_components[type].length)
		return weapon_components[type][random_id]
	}

	function generate_random_demo_weapon(): IWeapon {
		const weapon_data: IWeaponCreationParams = {
			base: pick_random_weapon_component(Math.random(), 'base'),
			qualifier1: pick_random_weapon_component(Math.random(), 'qualifier1'),
			qualifier2: pick_random_weapon_component(Math.random(), 'qualifier2'),
			quality: pick_random_weapon_component(Math.random(), 'quality'),
			base_strength: getRandomIntInclusive(Math.random(), 1, 20),
			enhancement_level: getRandomIntInclusive(Math.random(), 0, 10),
		}

		return weapon_model.create(weapon_data)
	}


	return {
		generate_random_demo_weapon
	}
}

////////////////////////////////////

export {
	create_instance,
}

////////////////////////////////////
