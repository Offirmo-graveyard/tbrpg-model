////////////////////////////////////

import { Random, Engine } from '@offirmo/random'

////////////

import { CoinsGain } from '../models/adventure_archetype'
import * as consts from './constants'

////////////////////////////////////

function generate_coin_gain(prng: Engine, amoutCategory: CoinsGain, player_level: number) {
	const level_multiplier = player_level * consts.coins_gain_per_level_multiplier
	const interval = consts.coins_gain_intervals[amoutCategory]

	return Random.integer(interval[0] * level_multiplier, interval[1] * level_multiplier)(prng)
}

////////////////////////////////////

export {
	generate_coin_gain
}

////////////////////////////////////
