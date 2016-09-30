import { Kernel } from 'inversify'

import { IWeaponComponent } from '../models/weapon_component'
import { kernel_module as weapon_component_kernel_module } from '../models/weapon_component/_inversify_module'

//import { IAdventureArchetype } from '../models/adventure_archetype'
import { kernel_module as adventure_archetype_kernel_module } from '../models/adventure_archetype/_inversify_module'

import { RSRCIDS, kernel_module } from './_inversify_module'

describe.only('TBRPG Dbs', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(weapon_component_kernel_module, adventure_archetype_kernel_module, kernel_module)
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
			it('should be exposed')
		})
		describe('[good] adventure archetypes', function () {
			it('should be exposed')
		})
		describe('[bad] adventure archetypes', function () {
			it('should be exposed')
		})

		describe('[all] item qualities', function () {
			it('should be exposed')
		})

		describe('[all] weapon components', function () {
			it('should be exposed')
		})
		describe('[base] weapon components', function () {
			it('should be exposed')
		})
		describe('[qualifier1] weapon components', function () {
			it('should be exposed')
		})
		describe('[qualifier2] weapon components', function () {
			it('should be exposed')
		})

		/*
		describe('weapon components', function() {
			it('should be exposed', () => {
				const kernel = make_kernel()
				const weapon_component_collection = kernel.get<LokiCollection<IWeaponComponent>>(RSRCIDS.static.weapon_components)
				//const adventure_archetype_collection = kernel.get<LokiCollection<IAdventureArchetype>>(RSRCIDS.static.adventure_archetypes)

				expect(weapon_component_collection.get(1)).to.have.property('$loki', 1)
				expect(weapon_component_collection.get(1)).to.have.property('hid', 'axe')
				expect(weapon_component_collection.get(1)).to.have.property('type', 'base')

				//console.log(adventure_archetype_collection.get(1))
				console.log(weapon_component_collection.find({
					type: { '$eq': 'base'},
					hid: { '$eq': 'sword'}
				}))
				//console.log(weapon_component_collection.chain().find({type: 'base'}).where(obj => obj.hid === 'sword').data())
			})

			it.only('should offer a convenient query API', () => {
				const kernel = make_kernel()
				const weapon_component_collection = kernel.get<LokiCollection<IWeaponComponent>>(RSRCIDS.static.weapon_components)

				console.log(weapon_component_collection.find({
				 type: { '$eq': 'base'},
				 hid: { '$eq': 'sword'}
				 }))
				console.log(weapon_component_collection.chain().find({type: 'base'}).where(obj => obj.hid === 'sword').data())
			})
		})
*/
	})
})
