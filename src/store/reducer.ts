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

import { SagaModel } from '../models/saga'

import { IState } from './types'

interface InjectableDependencies {
	saga_model: SagaModel
}

////////////


import {
	IActionSetRandomSeed,
	on_set_random_seed,
	IActionPlay,
	on_play,
} from './actions'


////////////

const initial_state: IState = {
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
	},
	internal: {
		randomjs_engine: Random.engines.mt19937(),
		//last_random_usage_count: -1,
		//last_random_seed: -1
	}
}

////////////

type IReducer = ReduxReducer<IState>

function factory(dependencies: InjectableDependencies): IReducer {
	const saga_model = dependencies.saga_model

	return (state: IState = initial_state, action: ReduxAction): IState => {

		console.log('* Saga reducer was dispatched an action: ', action)

		// inbound check
		saga_model.validate(state);

		switch (action.type) {
			case 'set_random_seed':
				state = on_set_random_seed(state, action as IActionSetRandomSeed)
				break

			case 'play':
				state = on_play(state, action as IActionPlay)
				break

			case '@@redux/INIT':
				break

			default:
				throw new Error('Reducer: Unknown action !')
		}

		//  outbound check
		saga_model.validate(state)

		return state
	}
}

////////////////////////////////////

export {
	InjectableDependencies,
	IReducer,
	initial_state,
	factory,
}

////////////////////////////////////
