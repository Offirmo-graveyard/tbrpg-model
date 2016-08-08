////////////////////////////////////

const _lodash = require('lodash')
const _schema = require('tbrpg-static-data/src/weapon_component/schema.json')

import {
	IJsonSchemaModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../utils/json-schema-based-model'

export interface InjectableDependencies {
	lodash?: any
	instantiate_json_schema_based_model?: any
	schema?: any
}

////////////

import { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams } from './types'

////////////////////////////////////

function create_instance (dependencies: InjectableDependencies = {}): IJsonSchemaModel<IWeaponComponent, IWeaponComponentCreationParams> {
	const _ = (dependencies.lodash || _lodash) as typeof _lodash
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as typeof _schema

	return instantiate_json_schema_based_model<IWeaponComponent, IWeaponComponentCreationParams>(schema)
}

const default_instance = create_instance()

////////////////////////////////////

export {
	WeaponComponentType,
	IWeaponComponent,
	IWeaponComponentCreationParams,
	_schema as schema,
	default_instance,
	create_instance
}

////////////////////////////////////
