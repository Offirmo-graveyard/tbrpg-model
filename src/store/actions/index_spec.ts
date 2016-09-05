import * as moment from 'moment'
import { Kernel } from "inversify"
import { Random } from '@offirmo/random'

import { IStore, IState } from '../index'
import { kernel_module as saga_kernel_module } from '../../models/saga/_inversify_module'
import { RSRCIDS, kernel_module } from '../_inversify_module'

import {
	/*IActionSetRandomSeed,
	on_set_random_seed,*/

	//IActionPlay,
	//on_play,
} from './index'


describe.only('redux store actions', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(saga_kernel_module)
		kernel.load(kernel_module)
		return kernel
	}

	function make_store(): IStore {
		const kernel = make_kernel()
		const factory = kernel.get<() => IStore>(RSRCIDS.factory)
		return factory()
	}

	describe('set_random_seed', function() {
		const NEW_SEED = 789

		it('should set the PRNG seed', () => {
			const store = make_store()

			let state = store.getState()
			expect(state).to.have.deep.property('prng_state.seed', 1234)

			store.dispatch({
				type: 'set_random_seed',
				seed: NEW_SEED
			})

			state = store.getState()
			expect(state).to.have.deep.property('prng_state.seed', NEW_SEED)
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

			let state = store.getState()
			expect(state).to.have.deep.property('prng_state.use_count', 1)

			store.dispatch({
				type: 'set_random_seed',
				seed: NEW_SEED
			})

			state = store.getState()
			expect(state).to.have.deep.property('prng_state.use_count', 0)
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

	describe('play', function() {
		const INIT_TIME = 0
		const INITIAL_WAIT_TIME = 1

		context('of type "bad" (too early)', function() {

			function make_store_with_preconditions(): IStore {
				const store = make_store()

				// immediate next click without waiting
				store.dispatch({
					type: 'play',
					click_date_moment_utc: moment(INIT_TIME).utc()
				})

				return store
			}

			it('should properly update click counts', () => {
				const store = make_store_with_preconditions()

				let state = store.getState()
				expect(state).to.have.property('click_count', 1)
				expect(state).to.have.property('valid_click_count', 0)
				//next_allowed_click_date_moment_utc: moment.Moment
			})

			it.skip('should properly update click next_allowed_click_date', () => {
				const store = make_store_with_preconditions()

				let state = store.getState()
				expect(state.next_allowed_click_date_moment_utc).to.be.sameMoment(
					moment(1).utc() // TODO mechanics
				)
			})
		})

		context('of type "good"', function() {

			function make_store_with_preconditions(): IStore {
				const store = make_store()

				let state = store.getState()
				expect(state).to.have.property('click_count', 0, 'initial state leak') // yes I had it once :-(

				// wait WAIT_TIME before clicking
				store.dispatch({
					type: 'play',
					click_date_moment_utc: moment(INITIAL_WAIT_TIME).utc()
				})

				return store
			}

			it('should properly update click counts', () => {
				const store = make_store_with_preconditions()

				let state = store.getState()
				expect(state).to.have.property('click_count', 1)
				expect(state).to.have.property('valid_click_count', 1)
			})

			it.skip('should properly update click next_allowed_click_date', () => {
				const store = make_store_with_preconditions()

				let state = store.getState()
				expect(state).to.have.property('next_allowed_click_date_moment_utc', 1)
			})

			describe('generated adventure', function() {

				context('having a "level increase" flag', function() {
					it('should update stats accordingly')
				})

				context('having a "give new weapon" flag', function() {

					context('when inventory has room', function () {
						it('should update inventory accordingly')
					})
					context('when inventory has no more room', function () {
						it('should update inventory accordingly')
					})
				})

			})
		})
	})

})
