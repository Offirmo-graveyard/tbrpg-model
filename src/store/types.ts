////////////////////////////////////

import { MT19937 } from '@offirmo/random'

////////////

import { ISaga } from '../models/saga'
import { IStaticData } from '../db'

////////////////////////////////////

interface IState {
	saga: ISaga
	internal: {
		prng: MT19937 | null
	}
	deps: {
		static_data: IStaticData | null
	}
}

////////////////////////////////////

export {
	IState
}

////////////////////////////////////
