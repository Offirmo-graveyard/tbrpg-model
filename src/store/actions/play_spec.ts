import * as moment from 'moment'
import { Kernel } from "inversify"
import { Random } from '@offirmo/random'

import { IStore, IState } from '../index'
import { kernel_module as saga_kernel_module } from '../../models/saga/_inversify_module'
import { RSRCIDS, kernel_module } from '../_inversify_module'
import * as AdventureArchetypeModel from '../../models/adventure_archetype/_inversify_module'

describe('redux store action "play"', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(saga_kernel_module, kernel_module)
		return kernel
	}

	function make_store(): IStore {
		const kernel = make_kernel()
		return kernel.get<IStore>(RSRCIDS.store)
	}

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
			const initial_next_allowed_click_date = make_store().getState().next_allowed_click_date_moment_utc

			let state = store.getState()
			expect(state.next_allowed_click_date_moment_utc).to.be.afterMoment(initial_next_allowed_click_date)
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
			const initial_next_allowed_click_date = make_store().getState().next_allowed_click_date_moment_utc

			let state = store.getState()
			expect(state.next_allowed_click_date_moment_utc).to.be.afterMoment(initial_next_allowed_click_date)
			expect(state).to.have.property('next_allowed_click_date_moment_utc', 1)
		})

		describe('generated adventure', function() {

			context('having a "level increase" flag', function() {
				it('should update stats accordingly', () => {
					const kernel = make_kernel()
					kernel.bind<AdventureArchetypeModel.IAdventureArchetypeCreationParams[]>(AdventureArchetypeModel.RSRCIDS.static_data)
						.toConstantValue([
							{ hid: "test", good: true, post: { gains: { level: true }}},
						])
					const store = kernel.get<IStore>(RSRCIDS.store)

					expect(store.getState().stats.level).to.equal(1)

					store.dispatch({
						type: 'play',
						click_date_moment_utc: moment(INITIAL_WAIT_TIME).utc()
					})

					let state = store.getState()
					expect(state.stats.level).to.equal(2)
				})
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
