////////////////////////////////////

type CoinsGain = 'none' | 'small' | 'medium' | 'big' | 'huge'

interface IAdventureArchetype {
	hid: string
	good: boolean
	pre: Object
	post: {
		gains: {
			level: boolean
			health: number
			mana: number
			strength: number
			agility: number
			vitality: number
			wisdom: number
			luck: number
			coins: CoinsGain
			tokens: number
			weapon: boolean
			armor: boolean
			weapon_improvement: boolean
			armor_improvement: boolean
			flags: any
		}
	}
}

interface IAdventureArchetypeCreationParams {
	hid: string
	good: boolean
	pre?: Object
	post?: {
		gains?: {
			level?: boolean
			health?: number
			mana?: number
			strength?: number
			agility?: number
			vitality?: number
			wisdom?: number
			luck?: number
			coins?: CoinsGain
			tokens?: number
			weapon?: boolean
			armor?: boolean
			weapon_improvement?: boolean
			armor_improvement?: boolean
			flags?: any
		}
	}
}

////////////////////////////////////

export {
	CoinsGain,
	IAdventureArchetype,
	IAdventureArchetypeCreationParams
}

////////////////////////////////////
