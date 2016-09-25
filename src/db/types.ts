////////////////////////////////////

import { IAdventureArchetype } from '../models/adventure_archetype'
import { IWeaponComponent, IWeaponComponentCreationParams, WeaponComponentModel } from '../models/weapon_component'

////////////////////////////////////

interface IStaticData {
	item_quality: {
		all: any[]
	}
	weapon_components: {
		all: IWeaponComponent[]
		base: IWeaponComponent[]
		qualifier_1: IWeaponComponent[]
		qualifier_2: IWeaponComponent[]
	}
	adventure_archetypes: {
		all: IAdventureArchetype[]
		good: IAdventureArchetype[]
		bad: IAdventureArchetype[]
	}
}

////////////////////////////////////

export {
	IStaticData,
}

////////////////////////////////////
