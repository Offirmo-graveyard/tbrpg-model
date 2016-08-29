////////////////////////////////////

import {
	Action as ReduxAction,
} from 'redux'

import * as moment from 'moment'

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

	return state
}

////////////////////////////////////

interface IActionPlay extends ReduxAction {
	type: 'play'
	click_date_moment_utc: moment.Moment
}

function on_play(state: IState, action: IActionPlay): IState {
	state.click_count++

	/*
		next_allowed_click_date_moment_utc: number

		valid_click_count: number
	*/

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
