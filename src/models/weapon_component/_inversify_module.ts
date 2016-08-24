////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import { ITranslationStore } from '../../common/types'

import {
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

let RSRCIDS = {
	Schema: Symbol('Schema'),
	StaticData: Symbol('StaticData'),
	Factory: Symbol('Factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.Schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<IWeaponComponentCreationParams[]>(RSRCIDS.StaticData)
		.toConstantValue(default_static_data as IWeaponComponentCreationParams[])

	bind<interfaces.Factory<WeaponComponentModel>>(RSRCIDS.Factory)
		.toFactory<WeaponComponentModel>((context: interfaces.Context) => () => factory({
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
