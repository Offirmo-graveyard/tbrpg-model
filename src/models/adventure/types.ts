////////////////////////////////////

import { IWeapon } from '../weapon'

////////////////////////////////////

interface IAdventure {
	adventure_archetype_hid: string
	good: boolean
	gains: {
		level: number
		health: number
		mana: number
		strength: number
		agility: number
		vitality: number
		wisdom: number
		luck: number
		coins: number
		tokens: number
		weapon: null | IWeapon
		armor: null
		improved_weapon_index: null | number
		improved_armor_index: null | number
	}
}

interface IAdventureCreationParams extends IAdventure {
}

////////////////////////////////////

export {
	IAdventure,
	IAdventureCreationParams
}

////////////////////////////////////
