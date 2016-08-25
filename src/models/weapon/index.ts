/** An item of type weapon
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

import { IWeapon, IWeaponCreationParams } from './types'

////////////////////////////////////

type WeaponModel = IJsonSchemaBasedModel<IWeapon, IWeaponCreationParams>

function factory(dependencies: InjectableDependencies): WeaponModel {
	const schema = dependencies.schema

	return instantiate_json_schema_based_model<IWeapon, IWeaponCreationParams>(schema)
}

////////////////////////////////////

export {
	InjectableDependencies,
	IWeapon,
	IWeaponCreationParams,
	WeaponModel,
	factory,
}

////////////////////////////////////
