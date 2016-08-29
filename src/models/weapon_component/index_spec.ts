import { Kernel } from "inversify"

import { ITranslationStore } from '../../common/types'

import {
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel,
} from './index'

import {
	RSRCIDS,
	kernel_module
} from './_inversify_module'

describe('Weapon Component Model', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(kernel_module)
		return kernel
	}

	describe('inversify bindings', function() {
		it('should expose the schema', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.schema)).to.be.true
		})

		it('should expose the static data', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.static_data)).to.be.true
		})

		it('should expose the factory', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.factory)).to.be.true
		})

		it('should expose the i18n data', function() {
			const kernel = make_kernel()
			expect(kernel.isBound('intl.fr')).to.be.true
			expect(kernel.isBound('intl.en')).to.be.true
		})
	})

	describe('static data', function() {
		it('should be valid', function() {
			const kernel = make_kernel()
			const static_data = kernel.get<IWeaponComponentCreationParams[]>(RSRCIDS.static_data)
			expect(static_data).to.be.an.array
		})
	})

	describe('factory', function() {
		it('should work', function() {
			const kernel = make_kernel()
			const static_data = kernel.get<IWeaponComponentCreationParams[]>(RSRCIDS.static_data)
			const factory = kernel.get<() => WeaponComponentModel>(RSRCIDS.factory)

			const model = factory()

			expect(model).to.respondTo('create')
			expect(model).to.respondTo('validate')
			expect(() => model.validate({foo: 42} as any as IWeaponComponent)).to.throw(Error)
			expect(() => model.validate(model.create(static_data[0]))).to.not.throw
		})
	})

	describe('i18n data', function() {
		it('should be valid', function() {
			const kernel = make_kernel()
			const static_data = kernel.get<IWeaponComponentCreationParams[]>(RSRCIDS.static_data);

			[ 'en', 'fr' ].forEach(lang => {
				const i18n = kernel.getAll<ITranslationStore>('intl.' + lang)
				expect(i18n).to.have.lengthOf(1)
				expect(Object.keys(i18n[0]).length).to.be.within(static_data.length, 2 * static_data.length)
			})
		})
	})
})
