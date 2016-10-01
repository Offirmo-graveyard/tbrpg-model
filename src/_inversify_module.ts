////////////////////////////////////

import * as AdventureModel          from './models/adventure/_inversify_module'
import * as AdventureArchetypeModel from './models/adventure_archetype/_inversify_module'
import * as ItemQualityModel        from './models/item_quality/_inversify_module'
import * as SagaModel               from './models/saga/_inversify_module'
import * as WeaponModel             from './models/weapon/_inversify_module'
import * as WeaponComponentModel    from './models/weapon_component/_inversify_module'

import * as Store from './store/_inversify_module'

////////////////////////////////////

const kernel_modules = [
	         AdventureModel.kernel_module,
	AdventureArchetypeModel.kernel_module,
	       ItemQualityModel.kernel_module,
	              SagaModel.kernel_module,
	            WeaponModel.kernel_module,
	   WeaponComponentModel.kernel_module,
	                  Store.kernel_module,
]

const RSRCIDS = {
	model: {
		adventure: AdventureModel.RSRCIDS,
		adventure_archetype: AdventureArchetypeModel.RSRCIDS,
		item_quality: ItemQualityModel.RSRCIDS,
		saga: SagaModel.RSRCIDS,
		weapon: WeaponModel.RSRCIDS,
		weapon_component: WeaponComponentModel.RSRCIDS,
	},
	store: Store.RSRCIDS
}

////////////////////////////////////

export {
	kernel_modules,
	RSRCIDS,
}

////////////////////////////////////
