////////////////////////////////////

type CoinsGain = 'none' | 'small' | 'medium' | 'big' | 'huge'

interface IAdventureArchetype {
	hid: string
	good: boolean
	pre: Object
	post: {
		gains: {
			level: boolean
			agility: number
			health: number
			luck: number
			mana: number
			strength: number
			vitality: number
			wisdom: number
			coins: CoinsGain
			tokens: number
			armor: boolean
			weapon: boolean
			armor_improvement: boolean
			weapon_improvement: boolean
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
			agility?: number
			health?: number
			luck?: number
			mana?: number
			strength?: number
			vitality?: number
			wisdom?: number
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
