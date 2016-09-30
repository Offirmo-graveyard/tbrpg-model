/** A component of a weapon. 4 types, when assembled, make a base random weapon.
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

import { ItemQualityType, IItemQuality, IItemQualityCreationParams } from './types'

////////////////////////////////////

type ItemQualityModel = IJsonSchemaBasedModel<IItemQuality, IItemQualityCreationParams>

function factory(dependencies: InjectableDependencies): ItemQualityModel {
	const schema = dependencies.schema

	return instantiate_json_schema_based_model<IItemQuality, IItemQualityCreationParams>(schema)
}

////////////////////////////////////

export {
	InjectableDependencies,
	ItemQualityType,
	IItemQuality,
	IItemQualityCreationParams,
	ItemQualityModel,
	factory,
}

////////////////////////////////////
