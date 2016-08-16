/** A resolved click adventure, i.e. ~an instance of an adventure archetype
 *
 */

////////////////////////////////////

import {
	IJsonSchema,
	IJsonSchemaModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

const _schema = require('./schema.json')
import i18n_en from './i18n/en'
import i18n_fr from './i18n/fr'

////////////

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: IJsonSchema
}

////////////

import { IAdventure, IAdventureCreationParams } from './types'

type AdventureModel = IJsonSchemaModel<IAdventure, IAdventureCreationParams>

////////////////////////////////////

function create_instance(dependencies: InjectableDependencies = {}): AdventureModel {
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as IJsonSchema

	return instantiate_json_schema_based_model<IAdventure, IAdventureCreationParams>(schema)
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
IAdventure,
IAdventureCreationParams,
AdventureModel,
_schema as schema,
default_instance,
create_instance,
get_i18n_data,
}

////////////////////////////////////
