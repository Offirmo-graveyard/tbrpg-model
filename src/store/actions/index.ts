////////////////////////////////////

import {
	Action as ReduxAction,
} from 'redux'

import * as moment from 'moment'

////////////

import { ISaga } from '../models/saga/types'

////////////////////////////////////

interface IActionSetRandomSeed extends ReduxAction {
	seed: number
}

function on_set_random_seed(state: ISaga, action: IActionSetRandomSeed) {
	state.random_seed = action.seed
	state.random_usage_count = 0

	return state
}

////////////////////////////////////

interface IActionPlay extends ReduxAction {
	click_date_moment_utc: moment.Moment
}

function on_play(state: ISaga, action: IActionPlay) {
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
