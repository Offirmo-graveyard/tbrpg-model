/** Saga's as a reduc state reducer
 */

////////////////////////////////////

import {
	Action as ReduxAction,
	Reducer as ReduxReducer,
} from 'redux'

const random = require('random-js') // TODO typings

////////////

import { ISaga, ISagaCreationParams } from './types'
import {
	IActionSetRandomSeed,
	on_set_random_seed
} from './actions'

////////////

const initial_state: ISaga = {
	random_seed: 1234,
	random_count: 0,
	click_count: 0,
	valid_click_count: 0,
	next_allowed_click_date_moment_utc: 0,
	stats: {
		level: 1,
		health: 1,
		mana: 0,
		strength: 1,
		agility: 1,
		vitality: 1,
		wisdom: 1,
		luck: 1
	},
	currencies: {
		coins: 0,
		tokens: 0
	},
	inventory:[],
	skills: [],
	flags: {
		recent_adventure_ids: []
	}
}

////////////

const reducer: ReduxReducer<ISaga> = (state: ISaga = initial_state, action: ReduxAction): ISaga => {
	// quick check
	default_instance.validate(store.getState())

	switch (action.type) {
		case 'set_random_seed':
			return on_set_random_seed(state, action as IActionSetRandomSeed)
		default:
			throw new Error('Unknown action !')
	}
}

////////////////////////////////////

export {
}

////////////////////////////////////
