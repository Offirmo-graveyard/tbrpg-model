////////////////////////////////////

import { Action as ReduxAction } from 'redux'
import * as moment from 'moment'
import { Random } from '@offirmo/random'

////////////

import { IAdventure } from '../../models/adventure'
import { IAdventureArchetype } from '../../models/adventure_archetype'
import { IState } from '../types'

import { generate_coin_gain } from '../../mechanics/coins'

////////////////////////////////////

interface IActionPlay extends ReduxAction {
	type: 'play'
	click_date_unix_timestamp_utc: number
}

function on_play(state: IState, action: IActionPlay): IState {
	state.saga.click_count++

	if (action.click_date_unix_timestamp_utc < state.saga.next_allowed_click_date_unix_timestamp_utc) {
		// too early ! bad click
		console.error('bad click', action.click_date_unix_timestamp_utc, state.saga.next_allowed_click_date_unix_timestamp_utc)
		state = on_bad_click(state)
	}
	else {
		// good click
		state.saga.valid_click_count++
		state = on_good_click(state)
	}

	return state
}


function on_bad_click(state: IState): IState {

	// TODO

	return state
}

function on_good_click(state: IState): IState {

	const aa = pickNextAdventureArchetype(state)
	//console.log('picked adventure', aa)

	// instantiate it to an adventure
	const gains = aa.post.gains // shortcut
	state.saga.last_adventure = {
		adventure_archetype_hid: aa.hid,
		good: aa.good,
		gains: {
			level: gains.level ? 1 : 0,
			health: gains.health,
			mana: gains.mana,
			strength: gains.strength,
			agility: gains.agility,
			vitality: gains.vitality,
			wisdom: gains.wisdom,
			luck: gains.luck,
			coins: generate_coin_gain(state.internal.prng!, gains.coins, state.saga.stats.level),
			tokens: gains.tokens,
			weapon: null, // TODO
			armor: null, // TODO
			improved_weapon_index: null, // TODO
			improved_armor_index: null, // TODO
		}
	}

	return state
}

// ~mutate state due to prn consumption
function pickNextAdventureArchetype(state: IState): IAdventureArchetype {
	const all = state.deps.static_data!.adventure_archetype.good

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
