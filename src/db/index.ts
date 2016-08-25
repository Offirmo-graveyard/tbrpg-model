////////////////////////////////////

import * as Loki from 'lokijs'

////////////

// static data
import {
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel,
	default_instance as _weapon_component_model
} from '../models/weapon_component'

import {
	IAdventureArchetype,
	IAdventureArchetypeCreationParams,
	AdventureArchetypeModel,
	default_instance as _adventure_archetype_model
} from '../models/adventure_archetype'


/*
declare module 'tbrpg-static-data/src/weapon_component' {
	const data: IWeaponComponentCreationParams[]
	export default data
}
import _weapon_component_static_data from 'tbrpg-static-data/src/weapon_component'
*/

const _adventure_archetype_static_data = require('tbrpg-static-data/src/adventure_archetype')
const _weapon_component_static_data = require('tbrpg-static-data/src/weapon_component')

import { LokiDb } from './types'

////////////

interface InjectableDependencies {
	static_db?: any
	//dynamic_db?: any
	adventure_archetype_model?: AdventureArchetypeModel
	adventure_archetype_static_data?: IAdventureArchetypeCreationParams[]
	weapon_component_model?: WeaponComponentModel
	weapon_component_static_data?: IWeaponComponentCreationParams[]
}

////////////////////////////////////

function factory(dependencies: InjectableDependencies = {}): LokiDb {
	const static_db = (dependencies.static_db || new Loki('loki_static.json')) as LokiDb
	//const dynamic_db = (dependencies.dynamic_db || new Loki('loki_dynamic.json')) as LokiDb
	const adventure_archetype_model = (dependencies.adventure_archetype_model || _adventure_archetype_model) as AdventureArchetypeModel
	const adventure_archetype_static_data = (dependencies.adventure_archetype_static_data || _adventure_archetype_static_data) as IAdventureArchetypeCreationParams[]
	const weapon_component_model = (dependencies.weapon_component_model || _weapon_component_model) as WeaponComponentModel
	const weapon_component_static_data = (dependencies.weapon_component_static_data || _weapon_component_static_data) as IWeaponComponentCreationParams[]


	const adventure_archetype_collection = static_db.addCollection<IAdventureArchetype>(adventure_archetype_model.schema.offirmo_extensions.hid)
	adventure_archetype_collection.insert(adventure_archetype_static_data.map(adventure_archetype_model.create))

	const weapon_component_collection = static_db.addCollection<IWeaponComponent>(weapon_component_model.schema.offirmo_extensions.hid)
	weapon_component_collection.insert(weapon_component_static_data.map(weapon_component_model.create))

	return static_db
}

//factory()

////////////////////////////////////

export {
	InjectableDependencies,
	LokiDb,
	factory,
}

////////////////////////////////////
