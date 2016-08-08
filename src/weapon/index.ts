////////////////////////////////////

import * as _ from 'lodash'

import {
	IJsonSchemaModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../utils/json-schema-based-model'

const _schema = require('./schema.json')

////////////

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: any
}

////////////

import { IWeapon, IWeaponCreationParams } from './types'

type WeaponModel = IJsonSchemaModel<IWeapon, IWeaponCreationParams>

////////////////////////////////////

function create_instance (dependencies: InjectableDependencies = {}): WeaponModel  {
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as typeof _schema

	return instantiate_json_schema_based_model<IWeapon, IWeaponCreationParams>(schema)
}

const default_instance = create_instance()

////////////////////////////////////

export const create = default_instance.create
export const validate = default_instance.validate
export const toString = default_instance.toString

export {
	IWeapon,
	IWeaponCreationParams,
	WeaponModel,
	_schema as schema,
	default_instance,
	create_instance,
}

////////////////////////////////////
