// TODO immutable

////////////////////////////////////

import {
	Action as ReduxAction,
} from 'redux'

import * as moment from 'moment'
import { Random } from '@offirmo/random'

////////////

import { IState } from '../types'

////////////////////////////////////
// for unit tests only, do not use !

interface IActionTest_XXX extends ReduxAction {
	type: 'test_xxx'
	op: (state: IState) => IState
}

function on_test_xxx(state: IState, action: IActionTest_XXX): IState {
	return action.op(state)
}

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

interface IActionPlay extends ReduxAction {
	type: 'play'
	click_date_moment_utc: moment.Moment
}

function on_play(state: IState, action: IActionPlay): IState {
	state.click_count++

	if (action.click_date_moment_utc.isBefore(state.next_allowed_click_date_moment_utc)) {
		// too early ! bad click
	}
	else {
		// good click
		state.valid_click_count++
		state =  on_good_click(state)
	}

	return state
}

function on_good_click(state: IState): IState {
	// pick an adventure archetype

	// instantiate it to an adventure

	return state
}


////////////////////////////////////

export {
	IActionTest_XXX,
	on_test_xxx,

	IActionSetRandomSeed,
	on_set_random_seed,

	IActionPlay,
	on_play,
}

////////////////////////////////////
