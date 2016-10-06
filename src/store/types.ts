////////////////////////////////////

import { MT19937 } from '@offirmo/random'

////////////

import { ISaga } from '../models/saga'
import { IStaticData } from '../db'

////////////////////////////////////

/** Attached to state for convenience, but not adding that much info
 */
interface IState extends ISaga {
	internal: {
		prng: MT19937 | null
		deps: {
			static_data: IStaticData | null
		}
	}
}

////////////////////////////////////

export {
	IState
}

////////////////////////////////////
