import * as CUT from './index'
import * as _ from 'lodash'

describe('WeaponComponent Model', function() {

	describe('creation', function () {

		context('with data (mandatory)', function () {

			it('should work', function () {
				let out = CUT.create({
					id: 'foo',
					i18n_key: 'm_foo',
					type: 'base'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'foo',
					i18n_key: 'm_foo',
					type: 'base',
					affinities: {}
				}))
			})

			it('should infer type from id', function () {
				let out: CUT.IWeaponComponent

				// base
				out = CUT.create({
					id: 'base_foo',
					i18n_key: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'base_foo',
					i18n_key: 'm_foo',
					type: 'base',
					affinities: {}
				}))

				// q1
				out = CUT.create({
					id: 'qualifier1_foo',
					i18n_key: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'qualifier1_foo',
					i18n_key: 'm_foo',
					type: 'qualifier1',
					affinities: {}
				}))

				// q2
				out = CUT.create({
					id: 'qualifier2_foo',
					i18n_key: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'qualifier2_foo',
					i18n_key: 'm_foo',
					type: 'qualifier2',
					affinities: {}
				}))

				// quality
				out = CUT.create({
					id: 'quality_foo',
					i18n_key: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'quality_foo',
					i18n_key: 'm_foo',
					type: 'quality',
					affinities: {}
				}))
			})

			it('should validate', function () {
				let tempfn = function() { CUT.create({
					id: 'base_foo',
					i18n_key: 'm_foo',
					type: 'xyz'
				} as any as CUT.IWeaponComponentCreationParams) }
				expect(tempfn).to.throw(Error, 'WeaponComponent model : provided data are invalid !')
			})

			it('should strip extra properties', function () {
				let out = CUT.create({
					id: 'base_foo',
					i18n_key: 'm_foo',
					foo: 'bar'
				} as any as CUT.IWeaponComponentCreationParams)
				expect(out).to.not.have.property('foo')
			})

			it('should provide sane defaults for missing properties', function () {
				let out = CUT.create({
					id: 'base_foo',
					i18n_key: 'm_foo'
				})
				expect(_.cloneDeep(out)).to.deep.equal(_.cloneDeep({
					id: 'base_foo',
					i18n_key: 'm_foo',
					type: 'base',
					affinities: {}
				}))
			})
		})
	})
})
