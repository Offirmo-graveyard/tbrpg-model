/** A resolved click adventure, i.e. an instance of an adventure archetype
 *
 */

////////////////////////////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

const _schema = require('./schema.json')
import i18n_en from './i18n/en'
import i18n_fr from './i18n/fr'

////////////

interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: IJsonSchemaExtended
}

////////////

import { IAdventure, IAdventureCreationParams } from './types'

type AdventureModel = IJsonSchemaBasedModel<IAdventure, IAdventureCreationParams>

////////////////////////////////////

function factory(dependencies: InjectableDependencies = {}): AdventureModel {
	const instantiate_json_schema_based_model =
		(dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema =
		(dependencies.schema || _schema) as IJsonSchemaExtended

	return instantiate_json_schema_based_model<IAdventure, IAdventureCreationParams>(schema)
}

const default_instance = factory()

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
	InjectableDependencies,
	IAdventure,
	IAdventureCreationParams,
	AdventureModel,
	_schema as schema,
	default_instance,
	factory,
	get_i18n_data,
}

////////////////////////////////////
