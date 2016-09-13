////////////////////////////////////

import * as Loki from 'lokijs'

////////////

// static data
import {
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel
} from '../models/weapon_component'

import {
	IAdventureArchetype,
	IAdventureArchetypeCreationParams,
	AdventureArchetypeModel
} from '../models/adventure_archetype'


////////////

interface InjectableDependencies {
	static_db?: any
	adventure_archetype_model: AdventureArchetypeModel
	adventure_archetype_static_data: IAdventureArchetypeCreationParams[]
	weapon_component_model: WeaponComponentModel
	weapon_component_static_data: IWeaponComponentCreationParams[]
}

////////////////////////////////////

type LokiDb = Loki

function factory(dependencies: InjectableDependencies): LokiDb {
	console.log('db factory !')
	const {
		adventure_archetype_model,
		adventure_archetype_static_data,
		weapon_component_model,
		weapon_component_static_data
	} = dependencies

	const static_db = (dependencies.static_db || new Loki('loki_static.json')) as LokiDb

	const adventure_archetype_collection = static_db.addCollection<IAdventureArchetype>(adventure_archetype_model.schema.offirmo_extensions.hid)
	adventure_archetype_collection.insert(adventure_archetype_static_data.map(adventure_archetype_model.create))

	const weapon_component_collection = static_db.addCollection<IWeaponComponent>(weapon_component_model.schema.offirmo_extensions.hid)
	weapon_component_collection.insert(weapon_component_static_data.map(weapon_component_model.create))

	return static_db
}

////////////////////////////////////

export {
	InjectableDependencies,
	LokiDb,
	factory,
}

////////////////////////////////////
