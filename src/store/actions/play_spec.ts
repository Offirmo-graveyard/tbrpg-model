import * as moment from 'moment'
import { Kernel } from "inversify"
import { Random } from '@offirmo/random'

import { IStore, IState } from '../index'

import { RSRCIDS } from '../_inversify_module'
import { modules } from '../_inversify_needed_modules'

import * as AdventureArchetypeModel from '../../models/adventure_archetype/_inversify_module'

describe('👷🏻 redux store action "play"', function() {

	function make_kernel() {
		const parent_kernel = new Kernel()
		parent_kernel.load(...modules)

		const kernel = new Kernel()
		kernel.parent = parent_kernel

		return kernel
	}

	function make_store(): IStore {
		const kernel = make_kernel()
		return kernel.get<IStore>(RSRCIDS.store)
	}

	const INIT_TIME = 0
	const INITIAL_WAIT_TIME = 1

	context('🙅🏻‍♀️ of type "bad" (too early)', function() {

		function make_store_with_preconditions(): IStore {
			const store = make_store()

			// immediate next click without waiting
			store.dispatch({
				type: 'play',
				click_date_unix_timestamp_utc: INIT_TIME
			})

			return store
		}

		it('should properly update click counts', () => {
			const store = make_store_with_preconditions()

			let saga = store.getState().saga
			expect(saga).to.have.property('click_count', 1)
			expect(saga).to.have.property('valid_click_count', 0)
		})

		it.skip('should properly update click next_allowed_click_date', () => {
			const store = make_store_with_preconditions()
			const initial_next_allowed_click_date = make_store().getState().saga.next_allowed_click_date_unix_timestamp_utc

			let saga = store.getState().saga
			expect(saga.next_allowed_click_date_unix_timestamp_utc).to.be.afterMoment(initial_next_allowed_click_date)
			expect(saga.next_allowed_click_date_unix_timestamp_utc).to.be.sameMoment(
				moment(1).utc() // TODO mechanics
			)
		})
	})

	context('🙆🏼  of type "good"', function() {

		function make_store_with_preconditions(): IStore {
			const store = make_store()

			let state = store.getState()
			expect(state)
				.to.have.deep.property('saga.click_count', 0, 'initial state leak across tests ?') // yes I had it once :-(

			// wait WAIT_TIME before clicking
			store.dispatch({
				type: 'play',
				click_date_unix_timestamp_utc: INITIAL_WAIT_TIME
			})

			return store
		}

		it('should properly update click counts', () => {
			const store = make_store_with_preconditions()

			let saga = store.getState().saga
			expect(saga).to.have.property('click_count', 1)
			expect(saga).to.have.property('valid_click_count', 1)
		})

		it.skip('should properly update click next_allowed_click_date', () => {
			const store = make_store_with_preconditions()
			const initial_next_allowed_click_date = make_store().getState().saga.next_allowed_click_date_unix_timestamp_utc

			let saga = store.getState().saga
			expect(saga.next_allowed_click_date_unix_timestamp_utc).to.be.afterMoment(initial_next_allowed_click_date)
			expect(saga).to.have.property('next_allowed_click_date_unix_timestamp_utc', 1)
		})

		context('for a generated adventure 📜 ', function() {

			context('having a "level increase" flag ⤴', function() {
				it('should update stats accordingly', () => {
					const kernel = make_kernel()
					kernel.bind<AdventureArchetypeModel.IAdventureArchetypeCreationParams[]>(AdventureArchetypeModel.RSRCIDS.static_data)
						.toConstantValue([
							{ hid: "test", good: true, post: { gains: { level: true }}},
						])
					const store = kernel.get<IStore>(RSRCIDS.store)

					expect(store.getState().saga.stats.level, 'initial value').to.equal(1)

					store.dispatch({
						type: 'play',
						click_date_unix_timestamp_utc: INITIAL_WAIT_TIME
					})

					let saga = store.getState().saga
					expect(saga.stats.level, 'final value').to.equal(2)
				})
			});

			[
			'agility',
				'health',
				'luck',
				'mana',
				'strength',
				'vitality',
				'wisdom',
			].forEach(stat => context(`having a "${stat} increase" flag 📈`, function() {
				it('should update stats accordingly', () => {
					const kernel = make_kernel()
					kernel.bind<AdventureArchetypeModel.IAdventureArchetypeCreationParams[]>(AdventureArchetypeModel.RSRCIDS.static_data)
						.toConstantValue([
							{ hid: "test", good: true, post: { gains: { [stat]: 3 }}},
						])
					const store = kernel.get<IStore>(RSRCIDS.store)

					const initial_value: number = (store.getState().saga.stats as any)[stat]

					store.dispatch({
						type: 'play',
						click_date_unix_timestamp_utc: INITIAL_WAIT_TIME
					})

					let saga = store.getState().saga
					expect((saga.stats as any)[stat], 'final value').to.equal(initial_value + 3)
				})
			}))

			context('having a "coin increase" flag 💰', function() {

				const CASES: { id: AdventureArchetypeModel.CoinsGain, expected_by_level: {[key: number]: number}}[] = [
					{
						id: 'none',
					 	expected_by_level: { 1: 0,   12: 0},
					},
					{
						id: 'small',
					 	expected_by_level: { 1: 6,   12: 208},
					},
					{
						id: 'medium',
						expected_by_level: { 1: 110,  12: 883},
					},
					{
						id: 'big',
						expected_by_level: { 1: 590,  12: 7874},
					},
					{
						id: 'huge',
						expected_by_level: { 1: 1437, 12: 25089},
					},
				]

				CASES.forEach(coins_gain => context(`having a '${coins_gain.id}' amount`, function() {

					[1, 12].forEach(level => context(`when player is level ${level}`, function() {
						it('should update stats accordingly', () => {
							const kernel = make_kernel()
							kernel.bind<AdventureArchetypeModel.IAdventureArchetypeCreationParams[]>(AdventureArchetypeModel.RSRCIDS.static_data)
								.toConstantValue([
									{ hid: "test", good: true, post: { gains: { coins: coins_gain.id }}},
								])
							const store = kernel.get<IStore>(RSRCIDS.store)

							expect(store.getState().saga.currencies.coins, 'initial value').to.equal(0)

							store.dispatch({
								type: 'test_xxx',
								op: (state: IState) => { state.saga.stats.level = level; return state }
							})
							expect(store.getState().saga.stats.level, 'forced level').to.equal(level)

							store.dispatch({
								type: 'play',
								click_date_unix_timestamp_utc: INITIAL_WAIT_TIME
							})

							let saga = store.getState().saga
							expect(saga.currencies.coins, 'final value').to.equal(coins_gain.expected_by_level[saga.stats.level])
						})
					}))
				}))
			})

			context.only('having a "give new weapon" flag 📦', function() {

				function make_store_with_weapon_giving_adventure_only() {
					const kernel = make_kernel()
					kernel.bind<AdventureArchetypeModel.IAdventureArchetypeCreationParams[]>(AdventureArchetypeModel.RSRCIDS.static_data)
					.toConstantValue([
						{ hid: "test", good: true, post: { gains: { weapon: true }}},
					])
					const store = kernel.get<IStore>(RSRCIDS.store)
					return store
				}

				context('when inventory has room', function () {
					it('should update inventory accordingly', () => {
						const store = make_store_with_weapon_giving_adventure_only()

						expect(store.getState().saga.inventory).to.have.lengthOf(0)

						store.dispatch({
							type: 'play',
							click_date_unix_timestamp_utc: INITIAL_WAIT_TIME
						})

						let saga = store.getState().saga
						expect(saga.inventory).to.have.lengthOf(1)
					})
				})

				context('when inventory has no more room', function () {
					it('should update inventory accordingly')
				})
			})
		})
	})
})
