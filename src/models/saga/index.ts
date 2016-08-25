/** A user's saga = user's minimal game state, serializable
 */

////////////////////////////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

////////////

interface InjectableDependencies {
	schema: IJsonSchemaExtended
}

////////////

import { ISaga, ISagaCreationParams } from './types'

////////////////////////////////////

type SagaModel = IJsonSchemaBasedModel<ISaga, ISagaCreationParams>

function factory(dependencies: InjectableDependencies): SagaModel {
	const schema = dependencies.schema

	return instantiate_json_schema_based_model<ISaga, ISagaCreationParams>(schema)
}

////////////////////////////////////

export {
	InjectableDependencies,
	ISaga,
	ISagaCreationParams,
	SagaModel,
	factory,
}

////////////////////////////////////
