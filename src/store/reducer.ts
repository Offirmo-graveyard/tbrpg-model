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
import { IStaticData } from '../db'

import { IState } from './types'

interface InjectableDependencies {
	saga_model: SagaModel
	static_data: IStaticData
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
	next_allowed_click_date_moment_utc: moment(1).utc(), // 1 helps for unit tests while not harming usability
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
	// additions, non persistable, null at start
	internal: {
		prng: null,
		static_data: null,
	}
}

////////////

type IReducer = ReduxReducer<IState>

function factory(dependencies: InjectableDependencies): IReducer {
	const {
		saga_model,
		static_data
	} = dependencies

	return (state: IState, action: ReduxAction): IState => {

		console.log('* TBRPG reducer was dispatched an action: ', action.type)
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
		state.internal.static_data = state.internal.static_data || static_data

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
