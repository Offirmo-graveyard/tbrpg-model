////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import { ITranslationStore } from '../../common/types'

import {
	WeaponModel,
	factory
} from './index'

////////////

const default_schema = require('./schema.json')

const i18n_en: ITranslationStore = require('./i18n/en')
const i18n_fr: ITranslationStore = require('./i18n/fr')

////////////////////////////////////

const RSRCIDS = {
	schema: Symbol('schema'),
	model: Symbol('model'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<WeaponModel>(RSRCIDS.model)
		.toDynamicValue((context: interfaces.Context) => factory({
			// TODO will need WeaponComponent model ?
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))
		.inSingletonScope()

	bind<ITranslationStore>('intl')
		.toConstantValue(i18n_en)
		.whenTargetTagged('lang', 'en')

	bind<ITranslationStore>('intl')
		.toConstantValue(i18n_fr)
		.whenTargetTagged('lang', 'fr')
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
