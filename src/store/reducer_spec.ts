
import { Action as ReduxAction } from 'redux'
import { Random } from '@offirmo/random'

import {
	IActionTest_XXX
} from './actions'

import {
	InjectableDependencies,
	IState,
	initial_state,
	factory,
} from './reducer'

// even if not expressed in Redux typings, state can be null (initial state)
type PracticalReducer = <A extends ReduxAction>(state: IState | null, action: A) => IState

describe.only('TBRPG Reducer', function() {

	const EXPECTED_SEED = 1234

	function make_reducer(): PracticalReducer {
		return factory({
			saga_model: {
				validate: () => undefined
			}
		} as any as InjectableDependencies) as PracticalReducer
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

				reducer(state, init_action)
			})

			it('should be checked at the end')
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

			expect(state.internal.prng!(), '1').to.equal(expected_prng())
			expect(state.internal.prng!(), '2').to.equal(expected_prng())
		})

		it('should update prng state after use', () => {
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
