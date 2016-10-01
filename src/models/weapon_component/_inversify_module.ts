////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import { ITranslationStore } from '../../common/types'

import {
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel,
	factory
} from './index'

////////////

const default_schema = require('tbrpg-static-data/src/weapon_component/schema.json')
const default_static_data: IWeaponComponentCreationParams[] = require('tbrpg-static-data/src/weapon_component')

const i18n_en: ITranslationStore = require('tbrpg-static-data/src/weapon_component/i18n/en.json')
const i18n_fr: ITranslationStore = require('tbrpg-static-data/src/weapon_component/i18n/fr.json')

////////////////////////////////////

const RSRCIDS = {
	schema: Symbol('schema'),
	static_data: Symbol('static_data'),
	model: Symbol('model'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<IWeaponComponentCreationParams[]>(RSRCIDS.static_data)
		.toConstantValue(default_static_data as IWeaponComponentCreationParams[])

	bind<WeaponComponentModel>(RSRCIDS.model)
		.toDynamicValue((context: interfaces.Context) => factory({
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
	kernel_module,
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel,
}

////////////////////////////////////
