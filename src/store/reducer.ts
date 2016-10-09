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
	saga: {
		click_count: 0,
		valid_click_count: 0,
		last_adventure: null,
		next_allowed_click_date_unix_timestamp_utc: 1, // 1 helps for unit tests while not harming usability
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
	},
	// additions, non persistable, null at start
	internal: {
		prng: null,
	},
	deps: {
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

	////////////

	function inbound(state: IState) {
		// inbound check
		try { saga_model.validate(state.saga) }
		catch (e) {
			console.error(e)
			e.message = 'TBRPG Reducer: inbound state is invalid !'
			throw e
		}

		if (!state.internal.prng) {
			state.internal.prng = Random.engines
				.mt19937()
				.seed(state.saga.prng_state.seed)
				.discard(state.saga.prng_state.use_count)
		}
		state.deps.static_data = state.deps.static_data || static_data
	}

	////////////

	function outbound(state: IState) {
		state.saga.prng_state.use_count = state.internal.prng!.getUseCount()

		//  outbound check
		try { saga_model.validate(state.saga) }
		catch (e) {
			e.message = 'TBRPG Reducer: outbound state is invalid !'
			throw e
		}
	}

	////////////

	return (state: IState, action: ReduxAction): IState => {
		console.log('* TBRPG reducer was dispatched an action:', action.type)

		state = state || _.cloneDeep(initial_state)

		inbound(state)

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

		outbound(state)

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
