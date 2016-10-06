import { Kernel } from 'inversify'

import { IStaticData, RSRCIDS } from './_inversify_module'
import { modules } from './_inversify_needed_modules'

describe('TBRPG Dbs', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(...modules)
		return kernel
	}

	describe('static', function () {

		describe('inversify bindings', function() {

			it('should expose the full static_db', function() {
				const kernel = make_kernel()
				expect(kernel.isBound(RSRCIDS.db.static.all)).to.be.true
			})

			it('should expose the adventure archetype collection', function() {
				const kernel = make_kernel()
				expect(kernel.isBound(RSRCIDS.db.static.adventure_archetype.all)).to.be.true
			})
		})

		describe('[all] adventure archetypes', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.adventure_archetype.all).to.be.an('array')
				expect(static_db.adventure_archetype.all.length).to.be.at.least(2)
			})
		})
		describe('[good] adventure archetypes', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.adventure_archetype.good).to.be.an('array')
				expect(static_db.adventure_archetype.good.length).to.be.at.least(1)
				expect(static_db.adventure_archetype.good.length).to.be.below(static_db.adventure_archetype.all.length)
			})
		})
		describe('[bad] adventure archetypes', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.adventure_archetype.bad).to.be.an('array')
				expect(static_db.adventure_archetype.bad.length).to.be.at.least(1)
				expect(static_db.adventure_archetype.bad.length).to.be.below(static_db.adventure_archetype.all.length)
			})
		})

		describe('[all] item qualities', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.item_quality.all).to.be.an('array')
				expect(static_db.item_quality.all.length).to.be.at.least(5)
			})
		})

		describe('[all] weapon components', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.weapon_component.all).to.be.an('array')
				expect(static_db.weapon_component.all.length).to.be.at.least(50)
			})
		})
		describe('[base] weapon components', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.weapon_component.base).to.be.an('array')
				expect(static_db.weapon_component.base.length).to.be.at.least(10)
				expect(static_db.weapon_component.base.length).to.be.below(static_db.weapon_component.all.length / 2)
			})
		})
		describe('[qualifier1] weapon components', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.weapon_component.qualifier_1).to.be.an('array')
				expect(static_db.weapon_component.qualifier_1.length).to.be.at.least(10)
				expect(static_db.weapon_component.qualifier_1.length).to.be.below(static_db.weapon_component.all.length / 2)
			})
		})
		describe('[qualifier2] weapon components', function () {
			it('should be exposed', () => {
				const static_db = make_kernel().get<IStaticData>(RSRCIDS.db.static.all)
				expect(static_db.weapon_component.qualifier_2).to.be.an('array')
				expect(static_db.weapon_component.qualifier_2.length).to.be.at.least(10)
				expect(static_db.weapon_component.qualifier_2.length).to.be.below(static_db.weapon_component.all.length / 2)
			})
		})
	})
})
