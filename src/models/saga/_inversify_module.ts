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
	schema: Symbol('schema'),
	factory: Symbol('factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<interfaces.Factory<SagaModel>>(RSRCIDS.factory)
		.toFactory<SagaModel>((context: interfaces.Context) => () => factory({
			// TODO will need Weapon model ?
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
