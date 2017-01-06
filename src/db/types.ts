////////////////////////////////////

import { IAdventureArchetype } from '../models/adventure_archetype'
import { IItemQuality } from '../models/item_quality'
import { IWeaponComponent } from '../models/weapon_component'

////////////////////////////////////

interface WeaponStaticData {
	all: IWeaponComponent[]
	base: IWeaponComponent[]
	qualifier_1: IWeaponComponent[]
	qualifier_2: IWeaponComponent[]
	quality: IItemQuality[]
}

interface IStaticData {
	adventure_archetype: {
		all: IAdventureArchetype[]
		good: IAdventureArchetype[]
		bad: IAdventureArchetype[]
	}
	item_quality: {
		all: IItemQuality[]
	}
	weapon_component: WeaponStaticData
}

////////////////////////////////////

export {
	WeaponStaticData,
	IStaticData,
}

////////////////////////////////////
