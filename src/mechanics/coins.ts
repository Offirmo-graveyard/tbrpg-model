////////////////////////////////////

import { Random, Engine } from '@offirmo/random'

////////////

import { CoinsGain } from '../models/adventure_archetype'
import * as CONST from './constants'

////////////////////////////////////

function generate_coin_gain(prng: Engine, amountCategory: CoinsGain, player_level: number) {
	const level_multiplier = player_level * CONST.coins_gain_per_level_multiplier
	const interval = CONST.coins_gain_intervals[amountCategory]

	return Random.integer(interval[0] * level_multiplier, interval[1] * level_multiplier)(prng)
}

////////////////////////////////////

export {
	generate_coin_gain
}

////////////////////////////////////
