////////////////////////////////////

import { IJSBModel, instantiate_model as _instantiate_json_schema_based_model } from '../utils/json-schema-based-model'
const _lodash = require('lodash')
const _schema = require('tbrpg-static-data/data/weapon_component/schema.json')

export interface InjectableDependencies {
	lodash?: any
	instantiate_json_schema_based_model?: any
	schema?: any
}

////////////

import { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams } from './types'

//const ALLOWED_TYPES = [ 'base', 'qualifier1', 'qualifier2', 'quality' ]

////////////////////////////////////

function instantiate_module (dependencies: InjectableDependencies = {}): IJSBModel<IWeaponComponent, IWeaponComponentCreationParams> {
	const _ = (dependencies.lodash || _lodash) as typeof _lodash
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as typeof _schema

	return instantiate_json_schema_based_model<IWeaponComponent, IWeaponComponentCreationParams>(schema)
}

const default_instance = instantiate_module()

////////////////////////////////////

export const create = default_instance.create
export const validate = default_instance.validate
export const toString = default_instance.toString

export {
	WeaponComponentType,
	IWeaponComponent,
	IWeaponComponentCreationParams,
	_schema as schema
}

////////////////////////////////////

