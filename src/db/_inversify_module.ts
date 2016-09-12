////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import { IAdventureArchetype, IAdventureArchetypeCreationParams, AdventureArchetypeModel } from '../models/adventure_archetype'
import { RSRCIDS as ADVENTURE_ARCHETYPE_RSRCIDS } from '../models/adventure_archetype/_inversify_module'
import { IWeaponComponent, IWeaponComponentCreationParams, WeaponComponentModel } from '../models/weapon_component'
import { RSRCIDS as WEAPON_COMPONENT_RSRCIDS } from '../models/weapon_component/_inversify_module'

import {
	LokiDb,
	factory
} from './index'

////////////////////////////////////

const RSRCIDS = {
	static_db: Symbol('static_db'),
	static: {
		adventure_archetypes: Symbol('adventure_archetypes'),
		weapon_components: Symbol('weapon_components'),
	}
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<LokiDb>(RSRCIDS.static_db)
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

	bind<LokiCollection<IAdventureArchetype>>(RSRCIDS.static.adventure_archetypes)
		.toDynamicValue((context: interfaces.Context) => {
			const adventure_archetype_model =
				context.kernel.get<AdventureArchetypeModel>(ADVENTURE_ARCHETYPE_RSRCIDS.model)
			const db:LokiDb =
				context.kernel.get<LokiDb>(RSRCIDS.static_db)
			return db.getCollection<IAdventureArchetype>(adventure_archetype_model.hid)
		})
		.inSingletonScope()

	bind<LokiCollection<IWeaponComponent>>(RSRCIDS.static.weapon_components)
		.toDynamicValue((context: interfaces.Context) => {
			const weapon_component_model =
				context.kernel.get<WeaponComponentModel>(WEAPON_COMPONENT_RSRCIDS.model)
			const db:LokiDb =
				context.kernel.get<LokiDb>(RSRCIDS.static_db)
			return db.getCollection<IWeaponComponent>(weapon_component_model.hid)
		})
		.inSingletonScope()
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
