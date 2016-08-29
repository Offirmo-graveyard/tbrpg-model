/** Saga's as a redux state reducer
 */

////////////////////////////////////

import * as _ from 'lodash'
import * as moment from 'moment'

import {
	Action as ReduxAction,
	Reducer as ReduxReducer,
} from 'redux'

import { Random } from '@offirmo/random'

////////////

import { SagaModel } from '../models/saga'

import { IState } from './types'

interface InjectableDependencies {
	saga_model: SagaModel
}

////////////

import {
	IActionTest_XXX,      on_test_xxx,
	IActionSetRandomSeed, on_set_random_seed,
	IActionPlay,          on_play,
} from './actions'

////////////

const initial_state: IState = {
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
	prng_state: {
		seed: 1234,
		use_count: 0
	},
	// additions, non persistable
	internal: {
		prng: null
	}
}

////////////

type IReducer = ReduxReducer<IState>

function factory(dependencies: InjectableDependencies): IReducer {
	const saga_model = dependencies.saga_model

	return (state: IState = initial_state, action: ReduxAction): IState => {

		console.log('* Saga reducer was dispatched an action: ', action)
		if (!state)
			state = _.cloneDeep(initial_state)

		// inbound check
		try { saga_model.validate(state) }
		catch (e) {
			e.message = 'TBRPG Reducer: inbound state is invalid !'
			throw e
		}

		if (!state.internal.prng) {
			state.internal.prng = Random.engines
				.mt19937()
				.seed(state.prng_state.seed)
				.discard(state.prng_state.use_count)
		}

		switch (action.type) {
			case 'test_xxx':
				state = on_test_xxx(state, action as IActionTest_XXX)
				break

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

		state.prng_state.use_count = state.internal.prng!.getUseCount()

		//  outbound check
		try { saga_model.validate(state) }
		catch (e) {
			e.message = 'TBRPG Reducer: outbound state is invalid !'
			throw e
		}

		return state
	}
}

////////////////////////////////////

export {
	InjectableDependencies,
	IState,
	initial_state,
	IReducer,
	factory,
}

////////////////////////////////////
