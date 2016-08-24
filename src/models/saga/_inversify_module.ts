////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import {
	SagaModel,
	factory
} from './index'

////////////

const default_schema = require('./schema.json')

////////////////////////////////////

let RSRCIDS = {
	Schema: Symbol('Schema'),
	Factory: Symbol('Factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.Schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<interfaces.Factory<SagaModel>>(RSRCIDS.Factory)
		.toFactory<SagaModel>((context: interfaces.Context) => () => factory({
			// TODO will need Weapon model ?
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.Schema)
		}))
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
