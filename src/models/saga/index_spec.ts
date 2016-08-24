import { Kernel } from "inversify"
import * as moment from 'moment'

import { ISaga, /*ISagaCreationParams,*/ SagaModel } from './index'

import {
	RSRCIDS,
	kernel_module
} from './_inversify_module'

describe('Saga Model', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(kernel_module)
		return kernel
	}

	describe('inversify bindings', function() {
		it('should expose the schema', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.Schema)).to.be.true
		})

		it('should expose the factory', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.Factory)).to.be.true
		})
	})

	describe('factory', function() {

		it('should work', function() {
			const kernel = make_kernel()
			const factory = kernel.get<() => SagaModel>(RSRCIDS.Factory)

			const model = factory()

			expect(model).to.respondTo('create')
			expect(model).to.respondTo('validate')
			expect(() => model.validate({foo: 42} as any as ISaga)).to.throw(Error)
			expect(() => model.validate(model.create({
				random_seed: 1234,
				random_usage_count: 0,
				click_count: 0,
				valid_click_count: 0,
				next_allowed_click_date_moment_utc: moment(),
				stats: {
					level: 1,
					health: 1,
					mana: 0,
					strength: 1,
					agility: 1,
					vitality: 1,
					wisdom: 0,
					luck: 0
				},
				currencies: {
					coins: 0,
					tokens: 0
				},
				inventory: [],
				skills: [],
				flags: {
					recent_adventure_ids: []
				}
			}))).to.not.throw
		})
	})
})
