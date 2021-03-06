////////////////////////////////////

import { IAdventure } from '../adventure'
import * as moment from 'moment'

////////////

interface ISaga {
	click_count: number
	valid_click_count: number
	last_adventure: IAdventure | null
	next_allowed_click_date_unix_timestamp_utc: number
	stats: {
		level: number
		health: number
		mana: number
		strength: number
		agility: number
		vitality: number
		wisdom: number
		luck: number
	}
	currencies: {
		coins: number
		tokens: number
	}
	inventory: any[]
	skills: any[]
	flags: {
		recent_adventure_ids: string[]
	},
	prng_state: {
		seed: number
		use_count: number
	}
}

interface ISagaCreationParams extends ISaga {
	// TODO
}

////////////////////////////////////

export {
	ISaga,
	ISagaCreationParams,
}

////////////////////////////////////
