import { Kernel } from "inversify"

import { ITranslationStore } from '../../common/types'

//import { IWeaponComponentCreationParams } from '../weapon_component'

import { IWeapon, /*IWeaponCreationParams,*/ WeaponModel } from './index'

import {
	RSRCIDS,
	kernel_module
} from './_inversify_module'

describe('Weapon Model', function() {

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

		it('should expose the i18n data', function() {
			const kernel = make_kernel()
			expect(kernel.isBound('intl.fr')).to.be.true
			expect(kernel.isBound('intl.en')).to.be.true
		})
	})

	describe('factory', function() {

		it('should work', function() {
			const kernel = make_kernel()
			const factory = kernel.get<() => WeaponModel>(RSRCIDS.Factory)

			const model = factory()

			expect(model).to.respondTo('create')
			expect(model).to.respondTo('validate')
			expect(() => model.validate({foo: 42} as any as IWeapon)).to.throw(Error)
			expect(() => model.validate(model.create({
				base: {
					hid: 'longsword',
					type: 'base'
				},
				qualifier1: {
					hid: 'invincible',
					type: 'qualifier1'
				},
				qualifier2: {
					hid: 'expert',
					type: 'qualifier2'
				},
				quality: {
					hid: 'epic',
					type: 'quality'
				},
				base_strength: 7
			}))).to.not.throw
		})

	})

	describe('i18n data', function() {

		it('should be valid', function() {
			const kernel = make_kernel();

			[ 'en', 'fr' ].forEach(lang => {
				const i18n = kernel.getAll<ITranslationStore>('intl.' + lang)
				expect(i18n).to.have.lengthOf(1)
				expect(Object.keys(i18n[0]).length).to.equal(1)
			})
		})

		describe('weapon name', function() {

			it('should work for en')

			it('should work for fr')

		})
	})
})
