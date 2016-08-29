////////////////////////////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

interface InjectableDependencies {
	schema: IJsonSchemaExtended
}

////////////

import { CoinsGain, IAdventureArchetype, IAdventureArchetypeCreationParams } from './types'

////////////////////////////////////

type AdventureArchetypeModel = IJsonSchemaBasedModel<IAdventureArchetype, IAdventureArchetypeCreationParams>

function factory(dependencies: InjectableDependencies): AdventureArchetypeModel {
	const {
		schema
	} = dependencies

	return instantiate_json_schema_based_model<IAdventureArchetype, IAdventureArchetypeCreationParams>(schema)
}

////////////////////////////////////

export {
	InjectableDependencies,
	CoinsGain,
	IAdventureArchetype,
	IAdventureArchetypeCreationParams,
	AdventureArchetypeModel,
	factory,
}

////////////////////////////////////
