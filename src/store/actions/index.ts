////////////////////////////////////

import {
	Action as ReduxAction,
} from 'redux'

import * as moment from 'moment'

////////////

import { IState } from '../types'

////////////////////////////////////

interface IActionSetRandomSeed extends ReduxAction {
	type: 'set_random_seed'
	seed: number
}

function on_set_random_seed(state: IState, action: IActionSetRandomSeed): IState {
	state.random_seed = action.seed
	state.random_usage_count = 0

	//xxx more

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
	IActionSetRandomSeed,
	on_set_random_seed,

	IActionPlay,
	on_play,
}

////////////////////////////////////
