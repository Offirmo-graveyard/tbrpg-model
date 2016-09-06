import { Action as ReduxAction } from 'redux'
import { Random } from '@offirmo/random'
import { Kernel } from "inversify"

import {
	IActionTest_XXX
} from './actions'

import {
	//InjectableDependencies,
	IReducer,
	IState,
	initial_state,
	//factory,
} from './reducer'

import { kernel_module as saga_kernel_module } from '../models/saga/_inversify_module'
import { RSRCIDS, kernel_module } from './_inversify_module'


// even if not expressed in Redux typings, state can be null (initial state)
type PracticalReducer = <A extends ReduxAction>(state: IState | null, action: A) => IState

describe('TBRPG Reducer', function() {
	const EXPECTED_SEED = 1234

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(saga_kernel_module)
		kernel.load(kernel_module)
		return kernel
	}

	function make_reducer(): PracticalReducer {
		const kernel = make_kernel()
		const reducer = kernel.get<IReducer>(RSRCIDS.reducer)
		return reducer as PracticalReducer
	}

	describe('state', function () {

		describe('initial value', function() {

			it('should be correct', () => {
				expect(initial_state).to.be.an.object
				expect(initial_state.prng_state).to.deep.equal({
					seed: EXPECTED_SEED,
					use_count: 0
				})
			})

			it('should be set automatically', () => {
				const init_action: ReduxAction = { type: '@@redux/INIT' }
				const reducer = make_reducer()
				const actual_initial_state = reducer(null, init_action)

				actual_initial_state.internal.prng = null // not comparable, tested later
				expect(actual_initial_state).to.deep.equal(initial_state)
			})
		})

		describe('validity', function () {
			it('should be checked at the beginning', () => {
				const init_action: ReduxAction = { type: '@@redux/INIT' }
				const reducer = make_reducer()
				const state = reducer(null, init_action);

				// wreck the state
				(state as any).click_count = 'foo'

				expect(() => reducer(state, init_action)).to.throw(Error, 'TBRPG Reducer: inbound state is invalid !')
			})

			it('should be checked at the end', () => {
				const test_action: IActionTest_XXX = {
					type: 'test_xxx',
					op: (state: IState) => {
						// wreck the state
						(state as any).click_count = 'foo'
						return state
					}
				}
				const reducer = make_reducer()

				expect(() => reducer(null, test_action)).to.throw(Error, 'TBRPG Reducer: outbound state is invalid !')
			})
		})
	})

	describe('prng', function () {

		it('should be initialized', () => {
			const init_action: ReduxAction = { type: '@@redux/INIT' }
			const reducer = make_reducer()
			const state = reducer(null, init_action)

			expect(state.internal.prng).to.exist
		})

		it('should produce repeatable randoms', () => {
			const init_action: ReduxAction = { type: '@@redux/INIT' }
			const reducer = make_reducer()
			const state = reducer(null, init_action)

			// check properly seeded
			const expected_prng = Random.engines.mt19937().seed(EXPECTED_SEED)
			const unexpected_prng = Random.engines.mt19937().seed(9999) // to check the test itself is correct

			const gen01 = state.internal.prng!()
			expect(gen01, '1a').to.equal(expected_prng())
			expect(gen01, '1b').to.not.equal(unexpected_prng())

			const gen02 = state.internal.prng!()
			expect(gen02, '2a').to.equal(expected_prng())
			expect(gen02, '2b').to.not.equal(unexpected_prng())
		})

		it('should be made persistable after use', () => {
			const USE_COUNT = 7
			const test_action: IActionTest_XXX = {
				type: 'test_xxx',
				op: (state: IState) => {
					// use the prng
					for(let i = 0; i < USE_COUNT; ++i) state.internal.prng!()
					return state
				}
			}
			const reducer = make_reducer()
			const state = reducer(null, test_action)

			expect(state.prng_state.use_count).to.equal(USE_COUNT)
		})
	})
})
