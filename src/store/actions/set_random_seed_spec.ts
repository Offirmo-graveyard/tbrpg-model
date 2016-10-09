import { Kernel } from "inversify"
import { Random } from '@offirmo/random'

import { IStore, IState } from '../index'
import { kernel_module as saga_kernel_module } from '../../models/saga/_inversify_module'
import { RSRCIDS, kernel_module } from '../_inversify_module'

describe('redux store action "set_random_seed"', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(saga_kernel_module, kernel_module)
		return kernel
	}

	function make_store(): IStore {
		const kernel = make_kernel()
		return kernel.get<IStore>(RSRCIDS.store)
	}

	const NEW_SEED = 789

	it('should set the PRNG seed', () => {
		const store = make_store()

		let state = store.getState()
		expect(state).to.have.deep.property('prng_state.seed', 1234)

		store.dispatch({
			type: 'set_random_seed',
			seed: NEW_SEED
		})

		let saga = store.getState().saga
		expect(saga).to.have.deep.property('prng_state.seed', NEW_SEED)
	})

	it('should reset the PRNG use count', () => {
		const store = make_store()

		store.dispatch({
			type: 'test_xxx',
			op: (state: IState) => {
				state.internal.prng!()
				return state
			}
		})

		let saga = store.getState().saga
		expect(saga).to.have.deep.property('prng_state.use_count', 1)

		store.dispatch({
			type: 'set_random_seed',
			seed: NEW_SEED
		})

		saga = store.getState().saga
		expect(saga).to.have.deep.property('prng_state.use_count', 0)
	})

	it('should effectively reset the PRNG', () => {
		const store = make_store()

		store.dispatch({
			type: 'set_random_seed',
			seed: NEW_SEED
		})

		// check properly seeded
		const expected_prng = Random.engines.mt19937().seed(NEW_SEED)
		const unexpected_prng = Random.engines.mt19937().seed(9999) // to check the test itself is correct

		let state = store.getState()

		const gen01 = state.internal.prng!()
		expect(gen01, '1a').to.equal(expected_prng())
		expect(gen01, '1b').to.not.equal(unexpected_prng())

		const gen02 = state.internal.prng!()
		expect(gen02, '2a').to.equal(expected_prng())
		expect(gen02, '2b').to.not.equal(unexpected_prng())
	})
})
