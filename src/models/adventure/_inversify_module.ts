////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import {
	IAdventure,
	IAdventureCreationParams,
	AdventureModel,
	factory
} from './index'

////////////

const default_schema = require('./schema.json')

////////////////////////////////////

const RSRCIDS = {
	schema: Symbol('[adventure model] schema'),
	model: Symbol('[adventure model] model'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<AdventureModel>(RSRCIDS.model)
		.toDynamicValue((context: interfaces.Context) => factory({
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))
		.inSingletonScope()
})

export {
	RSRCIDS,
	kernel_module,
	IAdventure,
	IAdventureCreationParams,
	AdventureModel,
}

////////////////////////////////////
