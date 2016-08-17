////////////////////////////////////

import { Engine } from 'random-js'

////////////////////////////////////

/** Attached to state for convenience, but not adding that much info
 */
interface IDerivedState {
	randomjs_engine: Engine
	last_random_usage_count: number
	last_random_seed: number
}

////////////////////////////////////

export {
	IDerivedState
}

////////////////////////////////////
