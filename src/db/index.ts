////////////////////////////////////

import * as Loki from 'lokijs'

////////////

import { IWeaponComponent, IWeaponComponentCreationParams, WeaponComponentModel, default_instance as _weapon_component_model } from '../weapon_component'
/*
declare module 'tbrpg-static-data/src/weapon_component' {
	const data: IWeaponComponentCreationParams[]
	export default data
}
import _weapon_component_static_data from 'tbrpg-static-data/src/weapon_component'
*/

const _weapon_component_static_data = require('tbrpg-static-data/src/weapon_component')


import { LokiDb } from './types'

////////////

export interface InjectableDependencies {
	static_db?: any
	//dynamic_db?: any
	weapon_component_model?: WeaponComponentModel
	weapon_component_static_data?: IWeaponComponentCreationParams[]
}

////////////////////////////////////

function create_static_db_instance (dependencies: InjectableDependencies = {}): LokiDb {
	const static_db = (dependencies.static_db || new Loki('loki_static.json')) as LokiDb
	//const dynamic_db = (dependencies.dynamic_db || new Loki('loki_dynamic.json')) as LokiDb
	const weapon_component_model = (dependencies.weapon_component_model || _weapon_component_model) as WeaponComponentModel
	const weapon_component_static_data = (dependencies.weapon_component_static_data || _weapon_component_static_data) as IWeaponComponentCreationParams[]

	const weapon_component_collection = static_db.addCollection<IWeaponComponent>(weapon_component_model.schema.offirmo_extensions.hid)
	weapon_component_collection.insert(weapon_component_static_data.map(weapon_component_model.create))

	return static_db
}

//create_instance()

////////////////////////////////////

export {
	LokiDb,
	create_static_db_instance,
}

////////////////////////////////////
