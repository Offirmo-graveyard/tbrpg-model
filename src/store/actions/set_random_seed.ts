////////////////////////////////////

import { Action as ReduxAction } from 'redux'
import { Random } from '@offirmo/random'

////////////

import { IState } from '../types'

////////////////////////////////////

interface IActionSetRandomSeed extends ReduxAction {
	type: 'set_random_seed'
	seed: number
}

function on_set_random_seed(state: IState, action: IActionSetRandomSeed): IState {
	state.prng_state.seed = action.seed
	state.prng_state.use_count = 0

	state.internal.prng = Random.engines
		.mt19937()
		.seed(state.prng_state.seed)

	return state
}

////////////////////////////////////

export {
	IActionSetRandomSeed,
	on_set_random_seed,
}

////////////////////////////////////
