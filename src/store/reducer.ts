/** Saga's as a reduc state reducer
 */

////////////////////////////////////

import {
	Action as ReduxAction,
	Reducer as ReduxReducer,
} from 'redux'

import * as moment from 'moment'

import { Random } from 'random-js'

////////////

import { ISaga } from '../models/saga/types'
import { default_instance } from '../models/saga'

import {
	IActionSetRandomSeed,
	on_set_random_seed
} from './actions'

import { IDerivedState } from './types'


////////////

const initial_state: ISaga = {
	random_seed: 1234,
	random_usage_count: 0,
	click_count: 0,
	valid_click_count: 0,
	next_allowed_click_date_moment_utc: moment(0).utc(),
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
	inventory: [],
	skills: [],
	flags: {
		recent_adventure_ids: []
	}
}

const derived_state_sym = Symbol('derived_state')

////////////

function derive_state(state: ISaga, derived_state?: IDerivedState): IDerivedState {
	derived_state = derived_state || {
			randomjs_engine: Random.engines.mt19937(),
			last_random_usage_count: -1,
			last_random_seed: -1
		}

	if (state.random_seed !== derived_state.last_random_seed
	|| state.random_usage_count < derived_state.last_random_usage_count) {

	}
	return derived_state
}

const reducer: ReduxReducer<ISaga> = (state: ISaga = initial_state, action: ReduxAction): ISaga => {
	let derived_state: IDerivedState

	console.log('* Saga reducer was dispatched an action: ', action)

	// inbound check
	default_instance.validate(state)

	derived_state = (state as any)[derived_state_sym] = derive_state(
		state,
		(state as any)[derived_state_sym] as IDerivedState
	)

	switch (action.type) {
		case 'set_random_seed':
			state = on_set_random_seed(state, action as IActionSetRandomSeed)
			break

		case '@@redux/INIT':
			break

		default:
			throw new Error('Reducer: Unknown action !')
	}

	//  outbound check
	default_instance.validate(state)

	return state
}

////////////////////////////////////

export {
initial_state,
reducer,
}

////////////////////////////////////
