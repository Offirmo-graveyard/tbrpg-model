/** A resolved click adventure, i.e. an instance of an adventure archetype
 *
 */

////////////////////////////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

////////////

import { IAdventure, IAdventureCreationParams } from './types'

////////////

interface InjectableDependencies {
	schema: IJsonSchemaExtended
}

////////////////////////////////////

type AdventureModel = IJsonSchemaBasedModel<IAdventure, IAdventureCreationParams>

function factory(dependencies: InjectableDependencies): AdventureModel {
	const {
		schema
	} = dependencies

	return instantiate_json_schema_based_model<IAdventure, IAdventureCreationParams>(schema)
}

////////////////////////////////////

export {
	InjectableDependencies,
	IAdventure,
	IAdventureCreationParams,
	AdventureModel,
	factory,
}

////////////////////////////////////
