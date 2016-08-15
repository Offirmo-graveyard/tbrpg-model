import {
	instantiate_model
} from './index'

describe('Json Schema based Model', function() {

	/*
	interface ITestModel {
		question: string
		answer: number
	}
	*/

	describe('instantiate_model()', function() {

		context('with INCORRECT parameters', function() {

			context('when schema is not provided', function() {

				it('should throw a corresponding error', function() {
					expect(() => (instantiate_model as any)()).to.throw(Error, 'json-schema-based-model: schema is invalid !')
				})

			})

			context('when schema is invalid', function() {

				it('should throw a corresponding error', function() {
					expect(() => (instantiate_model as any)({})).to.throw(Error, 'json-schema-based-model: schema is invalid !')
				})

			})

		})

		context('with correct parameters', function() {

		})

	})


	/*
	describe('creation', function () {

		context('with data (mandatory)', function () {

			it('should work', function () {
				let out = CUT.create({
					id: 'foo',
					i18n_radix: 'm_foo',
					type: 'base'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'foo',
					i18n_radix: 'm_foo',
					type: 'base',
					affinities: {}
				}))
			})

			it('should infer type from id', function () {
				let out: CUT.IWeaponComponent

				// base
				out = CUT.create({
					id: 'base_foo',
					i18n_radix: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'base_foo',
					i18n_radix: 'm_foo',
					type: 'base',
					affinities: {}
				}))

				// q1
				out = CUT.create({
					id: 'qualifier1_foo',
					i18n_radix: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'qualifier1_foo',
					i18n_radix: 'm_foo',
					type: 'qualifier1',
					affinities: {}
				}))

				// q2
				out = CUT.create({
					id: 'qualifier2_foo',
					i18n_radix: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'qualifier2_foo',
					i18n_radix: 'm_foo',
					type: 'qualifier2',
					affinities: {}
				}))

				// quality
				out = CUT.create({
					id: 'quality_foo',
					i18n_radix: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'quality_foo',
					i18n_radix: 'm_foo',
					type: 'quality',
					affinities: {}
				}))
			})

			it('should validate', function () {
				let tempfn = function() { CUT.create({
					id: 'base_foo',
					i18n_radix: 'm_foo',
					type: 'xyz'
				} as any as CUT.IWeaponComponentCreationParams) }
				expect(tempfn).to.throw(Error, 'WeaponComponent model : provided data are invalid !')
			})

			it('should strip extra properties', function () {
				let out = CUT.create({
					id: 'base_foo',
					i18n_radix: 'm_foo',
					foo: 'bar'
				} as any as CUT.IWeaponComponentCreationParams)
				expect(out).to.not.have.property('foo')
			})

			it('should provide sane defaults for missing properties', function () {
				let out = CUT.create({
					id: 'base_foo',
					i18n_radix: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'base_foo',
					i18n_radix: 'm_foo',
					type: 'base',
					affinities: {}
				}))
			})
		})
	})*/
})
