import { Kernel } from "inversify"

import {
	IAdventure,
	IAdventureCreationParams,
	AdventureModel,
} from './index'

import { RSRCIDS } from './_inversify_module'
import { modules } from './_inversify_needed_modules'

describe('Adventure Model', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(...modules)
		return kernel
	}

	describe('inversify bindings', function() {
		it('should expose the schema', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.schema)).to.be.true
		})

		it('should expose the model', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.model)).to.be.true
		})
	})

	describe('model', function() {
		it('should work', function() {
			const kernel = make_kernel()
			const model = kernel.get<AdventureModel>(RSRCIDS.model)

			expect(model).to.respondTo('create')
			expect(model).to.respondTo('validate')
			expect(() => model.validate({foo: 42} as any as IAdventure)).to.throw(Error)
			expect(() => model.validate(model.create({
				archetype_hid: 'foo',
				good: true,
				gains: {
					level: 0,
					health: 0,
					mana: 0,
					strength: 0,
					agility: 0,
					vitality: 0,
					wisdom: 0,
					luck: 0,
					coins: 0,
					tokens: 0,
					weapon: null,
					armor: null,
					improved_weapon_index: null,
					improved_armor_index: null,
				}
			}))).to.not.throw
		})
	})
})
