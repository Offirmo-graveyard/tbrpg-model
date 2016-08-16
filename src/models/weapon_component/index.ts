////////////////////////////////////

const _schema = require('tbrpg-static-data/src/weapon_component/schema.json')
const i18n_en = require('tbrpg-static-data/src/weapon_component/i18n/en.json')
const i18n_fr = require('tbrpg-static-data/src/weapon_component/i18n/fr.json')

import {
	IJsonSchema,
	IJsonSchemaModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: IJsonSchema
}

////////////

import { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams } from './types'

////////////////////////////////////

type WeaponComponentModel = IJsonSchemaModel<IWeaponComponent, IWeaponComponentCreationParams>

function create_instance(dependencies: InjectableDependencies = {}): WeaponComponentModel {
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as IJsonSchema

	return instantiate_json_schema_based_model<IWeaponComponent, IWeaponComponentCreationParams>(schema)
}

const default_instance = create_instance()

////////////

function get_i18n_data(locale: string): Object {
	switch (locale) {
		case 'en':
			return i18n_en
		case 'fr':
			return i18n_fr
		default:
			return {}
	}
}

////////////////////////////////////

export {
WeaponComponentType,
IWeaponComponent,
IWeaponComponentCreationParams,
WeaponComponentModel,
_schema as schema,
default_instance,
create_instance,
get_i18n_data,
}

////////////////////////////////////
