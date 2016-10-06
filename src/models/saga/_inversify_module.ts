////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import {
	ISaga,
	ISagaCreationParams,
	SagaModel,
	factory
} from './index'

////////////

const default_schema = require('./schema.json')

////////////////////////////////////

const RSRCIDS = {
	schema: Symbol('[saga model] schema'),
	model: Symbol('[saga model] model'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<SagaModel>(RSRCIDS.model)
		.toDynamicValue((context: interfaces.Context) => factory({
			// TODO will need Weapon model ?
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))
		.inSingletonScope()
})

export {
	RSRCIDS,
	kernel_module,
	ISaga,
	ISagaCreationParams,
	SagaModel,
}

////////////////////////////////////
