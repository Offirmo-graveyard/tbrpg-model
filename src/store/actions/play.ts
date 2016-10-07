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
	const gains = aa.post.gains // shorcut
	const a: IAdventure = {
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
			coins: generate_coin_gain(state.internal.prng!, gains.coins, state.stats.level),
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
