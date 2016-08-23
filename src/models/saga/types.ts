////////////////////////////////////

//import { IWeapon } from '../weapon'
import * as moment from 'moment'

////////////

interface ISaga {
	random_seed: number
	random_usage_count: number
	click_count: number
	valid_click_count: number
	next_allowed_click_date_moment_utc: moment.Moment
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
	}
}

interface ISagaCreationParams extends ISaga {
}

////////////////////////////////////

export {
	ISaga,
	ISagaCreationParams,
}

////////////////////////////////////