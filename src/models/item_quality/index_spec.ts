import { Kernel } from "inversify"

import { ITranslationStore } from '../../common/types'

import {
	IItemQuality,
	IItemQualityCreationParams,
	ItemQualityModel,
} from './index'

import { RSRCIDS } from './_inversify_module'
import { modules } from './_inversify_needed_modules'

describe('Item Quality Model', function() {

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

		it('should expose the static data', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.static_data)).to.be.true
		})

		it('should expose the model', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.model)).to.be.true
		})

		it('should expose the i18n data', function() {
			const kernel = make_kernel()
			expect(kernel.isBound('intl')).to.be.true
		})
	})

	describe('static data', function() {
		it('should be valid', function() {
			const kernel = make_kernel()
			const static_data = kernel.get<IItemQualityCreationParams[]>(RSRCIDS.static_data)
			expect(static_data).to.be.an.array
		})
	})

	describe('model', function() {
		it('should work', function() {
			const kernel = make_kernel()
			const static_data = kernel.get<IItemQualityCreationParams[]>(RSRCIDS.static_data)
			const model = kernel.get<ItemQualityModel>(RSRCIDS.model)

			expect(model).to.respondTo('create')
			expect(model).to.respondTo('validate')
			expect(() => model.validate({foo: 42} as any as IItemQuality)).to.throw(Error)
			expect(() => model.validate(model.create(static_data[0]))).to.not.throw
		})
	})

	describe('i18n data', function() {
		it('should be valid', function() {
			const kernel = make_kernel()
			const static_data = kernel.get<IItemQualityCreationParams[]>(RSRCIDS.static_data);

			[ 'en', 'fr' ].forEach(lang => {
				const i18n = kernel.getAllTagged<ITranslationStore>('intl', 'lang', lang)
				expect(i18n).to.have.lengthOf(1)
				expect(Object.keys(i18n[0]).length).to.be.within(static_data.length, 2 * static_data.length)
			})
		})
	})
})
