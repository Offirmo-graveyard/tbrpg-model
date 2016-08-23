/** A user's saga = user's minimal game state, serializable
 */

////////////////////////////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

////////////

const _schema = require('./schema.json')

import { ISaga, ISagaCreationParams } from './types'

////////////

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: IJsonSchemaExtended
}

////////////

type SagaModel = IJsonSchemaBasedModel<ISaga, ISagaCreationParams>

////////////////////////////////////

function factory(dependencies: InjectableDependencies = {}): SagaModel {
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as IJsonSchemaExtended

	return instantiate_json_schema_based_model<ISaga, ISagaCreationParams>(schema)
}

const default_instance = factory()

////////////

export {
	ISaga,
	ISagaCreationParams,
	SagaModel,
	_schema as schema,
	default_instance,
	factory,
}

////////////////////////////////////