////////////////////////////////////

const _schema = require('tbrpg-static-data/src/adventure_archetype/schema.json')
const i18n_en = require('tbrpg-static-data/src/adventure_archetype/i18n/en.json')
const i18n_fr = require('tbrpg-static-data/src/adventure_archetype/i18n/fr.json')

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: IJsonSchemaExtended
}

////////////

import { CoinsGain, IAdventureArchetype, IAdventureArchetypeCreationParams } from './types'

////////////////////////////////////

type AdventureArchetypeModel = IJsonSchemaBasedModel<IAdventureArchetype, IAdventureArchetypeCreationParams>

function factory(dependencies: InjectableDependencies = {}): AdventureArchetypeModel {
	const instantiate_json_schema_based_model =
		(dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema =
		(dependencies.schema || _schema) as IJsonSchemaExtended

	return instantiate_json_schema_based_model<IAdventureArchetype, IAdventureArchetypeCreationParams>(schema)
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
	CoinsGain,
	IAdventureArchetype,
	IAdventureArchetypeCreationParams,
	AdventureArchetypeModel,
	_schema as schema,
	default_instance,
	factory,
	get_i18n_data,
}

////////////////////////////////////
