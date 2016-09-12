import { Kernel } from "inversify"

import {
	LokiDb,
} from './index'

import { IWeaponComponent } from '../models/weapon_component'
import { kernel_module as weapon_component_kernel_module } from '../models/weapon_component/_inversify_module'

import { IAdventureArchetype } from '../models/adventure_archetype'
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
				expect(kernel.isBound(RSRCIDS.static_db)).to.be.true
			})

			it('should expose the weapon component collection', function() {
				const kernel = make_kernel()
				expect(kernel.isBound(RSRCIDS.static.weapon_components)).to.be.true
			})
		})

		describe('weapon components', function() {
			it('should be exposed', () => {
				const kernel = make_kernel()
				const weapon_component_collection = kernel.get<LokiCollection<IWeaponComponent>>(RSRCIDS.static.weapon_components)
				//const adventure_archetype_collection = kernel.get<LokiCollection<IAdventureArchetype>>(RSRCIDS.static.adventure_archetypes)

				console.log(weapon_component_collection.get(1))
				//console.log(adventure_archetype_collection.get(1))
				console.log(weapon_component_collection.find( {'name':'Sleipnir'} ))
			})
		})
	})
})
