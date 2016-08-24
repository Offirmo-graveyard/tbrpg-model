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
	Schema: Symbol('Schema'),
	Factory: Symbol('Factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.Schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<interfaces.Factory<WeaponModel>>(RSRCIDS.Factory)
		.toFactory<WeaponModel>((context: interfaces.Context) => () => factory({
			// TODO will need WeaponComponent model ?
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.Schema)
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
