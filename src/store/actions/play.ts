////////////////////////////////////

import { Action as ReduxAction } from 'redux'
import * as moment from 'moment'
import { Random } from '@offirmo/random'

////////////

import { IAdventureArchetype } from '../../models/adventure_archetype'
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
		state = on_good_click(state)
	}

	return state
}

function on_good_click(state: IState): IState {

	const aa = pickNextAdventureArchetype(state)
	console.log(aa)

	// instantiate it to an adventure

	return state
}

// ~mutate state due to prn consumption
function pickNextAdventureArchetype(state: IState): IAdventureArchetype {
	const all = state.internal.deps.static_data!.adventure_archetype.all

	return Random.pick<IAdventureArchetype>(
		state.internal.prng!,
		all
	)
}

////////////////////////////////////

export {
	IActionPlay,
	on_play,
}

////////////////////////////////////
