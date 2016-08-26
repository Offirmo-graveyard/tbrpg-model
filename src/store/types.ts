////////////////////////////////////

import { MT19937 } from '@offirmo/random'

////////////

import { ISaga } from '../models/saga'

////////////////////////////////////

/** Attached to state for convenience, but not adding that much info
 */
interface IState extends ISaga {
	internal: {
		randomjs_engine: MT19937
		//last_random_usage_count: number
		//last_random_seed: number
	}
}

////////////////////////////////////

export {
	IState
}

////////////////////////////////////
