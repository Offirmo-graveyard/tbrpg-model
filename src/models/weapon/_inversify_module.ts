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

let RSRCIDS = {
	schema: Symbol('schema'),
	factory: Symbol('factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<interfaces.Factory<WeaponModel>>(RSRCIDS.factory)
		.toFactory<WeaponModel>((context: interfaces.Context) => () => factory({
			// TODO will need WeaponComponent model ?
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))

	bind<ITranslationStore>('intl.en')
		.toConstantValue(i18n_en)

	bind<ITranslationStore>('intl.fr')
		.toConstantValue(i18n_fr)
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
