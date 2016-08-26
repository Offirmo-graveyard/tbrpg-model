////////////////////////////////////

import { Engine } from 'random-js'

////////////

import { ISaga } from '../models/saga'

////////////////////////////////////

/** Attached to state for convenience, but not adding that much info
 */
interface IState extends ISaga {
	internal: {
		randomjs_engine: Engine
		last_random_usage_count: number
		last_random_seed: number
	}
}

////////////////////////////////////

export {
	IState
}

////////////////////////////////////
