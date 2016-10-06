////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import {
	IAdventureArchetype, IAdventureArchetypeCreationParams, AdventureArchetypeModel,
	RSRCIDS as ADVENTURE_ARCHETYPE_RSRCIDS
} from '../models/adventure_archetype/_inversify_module'
import {
	IItemQuality, IItemQualityCreationParams, ItemQualityModel,
	RSRCIDS as ITEM_QUALITY_RSRCIDS
} from '../models/item_quality/_inversify_module'
import {
	IWeaponComponent, IWeaponComponentCreationParams, WeaponComponentModel,
	RSRCIDS as WEAPON_COMPONENT_RSRCIDS
} from '../models/weapon_component/_inversify_module'

import { IStaticData, factory } from './index'

////////////////////////////////////

const RSRCIDS = {
	static: {
		all: Symbol('db.static.all'),
		adventure_archetype: {
			all: Symbol('db.static.adventure_archetype')
		}
	}
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IStaticData>(RSRCIDS.static.all)
		.toDynamicValue((context: interfaces.Context) => factory({
			adventure_archetype_model:
				context.kernel.get<AdventureArchetypeModel>(ADVENTURE_ARCHETYPE_RSRCIDS.model),
			adventure_archetype_static_data:
				context.kernel.get<IAdventureArchetypeCreationParams[]>(ADVENTURE_ARCHETYPE_RSRCIDS.static_data),
			item_quality_model:
				context.kernel.get<ItemQualityModel>(ITEM_QUALITY_RSRCIDS.model),
			item_quality_static_data:
				context.kernel.get<IItemQualityCreationParams[]>(ITEM_QUALITY_RSRCIDS.static_data),
			weapon_component_model:
				context.kernel.get<WeaponComponentModel>(WEAPON_COMPONENT_RSRCIDS.model),
			weapon_component_static_data:
				context.kernel.get<IWeaponComponentCreationParams[]>(WEAPON_COMPONENT_RSRCIDS.static_data)
		}))
		.inSingletonScope()

	bind<IAdventureArchetype[]>(RSRCIDS.static.adventure_archetype.all)
		.toDynamicValue((context: interfaces.Context) =>
				context.kernel.get<IStaticData>(RSRCIDS.static.all).adventure_archetype.all
		)
		.inSingletonScope()
})

export {
	RSRCIDS,
	kernel_module,
	IStaticData,
}

////////////////////////////////////
