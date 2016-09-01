////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

import { IJsonSchemaExtended } from '../../_incubator/json-schema-based-model'

////////////

import { ITranslationStore } from '../../common/types'

import {
	AdventureArchetypeModel,
	IAdventureArchetypeCreationParams,
	factory
} from './index'

////////////

const default_schema = require('tbrpg-static-data/src/adventure_archetype/schema.json')
const default_static_data: IAdventureArchetypeCreationParams[] = require('tbrpg-static-data/src/adventure_archetype')

const i18n_en: ITranslationStore = require('tbrpg-static-data/src/adventure_archetype/i18n/en.json')
const i18n_fr: ITranslationStore = require('tbrpg-static-data/src/adventure_archetype/i18n/fr.json')

////////////////////////////////////

const RSRCIDS = {
	schema: Symbol('schema'),
	static_data: Symbol('static_data'),
	factory: Symbol('factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IJsonSchemaExtended>(RSRCIDS.schema)
		.toConstantValue(default_schema as IJsonSchemaExtended)

	bind<IAdventureArchetypeCreationParams[]>(RSRCIDS.static_data)
		.toConstantValue(default_static_data as IAdventureArchetypeCreationParams[])

	bind<interfaces.Factory<AdventureArchetypeModel>>(RSRCIDS.factory)
		.toFactory<AdventureArchetypeModel>((context: interfaces.Context) => () => factory({
			schema: context.kernel.get<IJsonSchemaExtended>(RSRCIDS.schema)
		}))

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
