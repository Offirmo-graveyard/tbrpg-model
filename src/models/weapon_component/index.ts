/** A component of a weapon. 4 types, when assembled, make a base random weapon.
 */

////////////////////////////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model as instantiate_json_schema_based_model
} from '../../_incubator/json-schema-based-model'

////////////

export interface InjectableDependencies {
	schema: IJsonSchemaExtended
}

////////////

import { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams } from './types'

////////////////////////////////////

type WeaponComponentModel = IJsonSchemaBasedModel<IWeaponComponent, IWeaponComponentCreationParams>

function factory(dependencies: InjectableDependencies): WeaponComponentModel {
	const schema = dependencies.schema

	return instantiate_json_schema_based_model<IWeaponComponent, IWeaponComponentCreationParams>(schema)
}

////////////////////////////////////

export {
	WeaponComponentType,
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel,
	factory,
}

////////////////////////////////////
