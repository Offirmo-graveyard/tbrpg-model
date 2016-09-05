////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import { IAdventureArchetypeCreationParams, AdventureArchetypeModel } from '../models/adventure_archetype'
import { RSRCIDS as ADVENTURE_ARCHETYPE_RSRCIDS } from '../models/adventure_archetype/_inversify_module'
import { IWeaponComponentCreationParams, WeaponComponentModel } from '../models/weapon_component'
import { RSRCIDS as WEAPON_COMPONENT_RSRCIDS } from '../models/weapon_component/_inversify_module'

import {
	LokiDb,
	factory
} from './index'

////////////////////////////////////

const RSRCIDS = {
	factory: Symbol('factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<interfaces.Factory<LokiDb>>(RSRCIDS.factory)
		.toFactory<LokiDb>((context: interfaces.Context) => () => factory({
			adventure_archetype_model:
				context.kernel.get<() => AdventureArchetypeModel>(ADVENTURE_ARCHETYPE_RSRCIDS.factory)(),
			adventure_archetype_static_data:
				context.kernel.get<IAdventureArchetypeCreationParams[]>(ADVENTURE_ARCHETYPE_RSRCIDS.static_data),
			weapon_component_model:
				context.kernel.get<() => WeaponComponentModel>(WEAPON_COMPONENT_RSRCIDS.factory)(),
			weapon_component_static_data:
				context.kernel.get<IWeaponComponentCreationParams[]>(WEAPON_COMPONENT_RSRCIDS.static_data)
		}))
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
