////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import {
	AdventureModel,
	factory
} from './index'

////////////

const default_schema = require('./schema.json')

////////////////////////////////////

const RSRCIDS = {
	schema: Symbol('schema'),
	factory: Symbol('factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<interfaces.Factory<AdventureModel>>(RSRCIDS.factory)
		.toFactory<AdventureModel>((context: interfaces.Context) => () => factory({
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
