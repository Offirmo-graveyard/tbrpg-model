////////////////////////////////////

import { IAdventureArchetype } from '../models/adventure_archetype'
import { IItemQuality } from '../models/item_quality'
import { IWeaponComponent } from '../models/weapon_component'

////////////////////////////////////

interface IStaticData {
	adventure_archetype: {
		all: IAdventureArchetype[]
		good: IAdventureArchetype[]
		bad: IAdventureArchetype[]
	}
	item_quality: {
		all: IItemQuality[]
	}
	weapon_component: {
		all: IWeaponComponent[]
		base: IWeaponComponent[]
		qualifier_1: IWeaponComponent[]
		qualifier_2: IWeaponComponent[]
	}
}

////////////////////////////////////

export {
	IStaticData,
}

////////////////////////////////////
