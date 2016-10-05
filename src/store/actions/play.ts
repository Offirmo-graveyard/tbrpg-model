////////////////////////////////////

import { Action as ReduxAction } from 'redux'
import * as moment from 'moment'
import { Random } from '@offirmo/random'

////////////

import { IState } from '../types'

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
	IActionPlay,
	on_play,
}

////////////////////////////////////
