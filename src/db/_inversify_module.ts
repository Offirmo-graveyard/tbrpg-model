////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import { IAdventureArchetype, IAdventureArchetypeCreationParams, AdventureArchetypeModel } from '../models/adventure_archetype'
import { RSRCIDS as ADVENTURE_ARCHETYPE_RSRCIDS } from '../models/adventure_archetype/_inversify_module'
import { IWeaponComponent, IWeaponComponentCreationParams, WeaponComponentModel } from '../models/weapon_component'
import { RSRCIDS as WEAPON_COMPONENT_RSRCIDS } from '../models/weapon_component/_inversify_module'

import { IStaticData, factory } from './index'

////////////////////////////////////

const RSRCIDS = {
	db: {
		static: {
			full: Symbol('db.static.full'),
			adventure_archetypes: {
				all: Symbol('db.static.adventure_archetypes')
			}
		}
	}
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IStaticData>(RSRCIDS.db.static.full)
		.toDynamicValue((context: interfaces.Context) => factory({
			adventure_archetype_model:
				context.kernel.get<AdventureArchetypeModel>(ADVENTURE_ARCHETYPE_RSRCIDS.model),
			adventure_archetype_static_data:
				context.kernel.get<IAdventureArchetypeCreationParams[]>(ADVENTURE_ARCHETYPE_RSRCIDS.static_data),
			weapon_component_model:
				context.kernel.get<WeaponComponentModel>(WEAPON_COMPONENT_RSRCIDS.model),
			weapon_component_static_data:
				context.kernel.get<IWeaponComponentCreationParams[]>(WEAPON_COMPONENT_RSRCIDS.static_data)
		}))
		.inSingletonScope()

	bind<IAdventureArchetype[]>(RSRCIDS.db.static.adventure_archetypes.all)
		.toDynamicValue((context: interfaces.Context) =>
				context.kernel.get<IStaticData>(RSRCIDS.db.static.full).adventure_archetypes.all
		)
		.inSingletonScope()
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
