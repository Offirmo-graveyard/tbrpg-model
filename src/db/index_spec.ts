import { Kernel } from "inversify"

import {
	LokiDb,
} from './index'

import {
	IWeaponComponent,
	WeaponComponentType,
	WeaponComponentModel,
} from '../models/weapon_component'
import { kernel_module as weapon_component_kernel_module } from '../models/weapon_component/_inversify_module'

import { kernel_module as adventure_archetype_kernel_module } from '../models/adventure_archetype/_inversify_module'

import { RSRCIDS, kernel_module } from './_inversify_module'

describe.only('TBRPG Db', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(weapon_component_kernel_module, adventure_archetype_kernel_module, kernel_module)
		return kernel
	}

	function make_static_db(): LokiDb {
		const kernel = make_kernel()
		return kernel.get<LokiDb>(RSRCIDS.static_db)
	}

	describe('inversify bindings', function() {
		it('should expose the static_db', function() {
			const kernel = make_kernel()
			expect(kernel.isBound(RSRCIDS.static_db)).to.be.true
		})
	})

	describe('static db', function() {
		it('should expose weapon components', () => {
			const db = make_static_db()
			//const weapon_component_collection = static_db.getCollection<IWeaponComponent>(weapon_component_model.hid)
		})
	})
})
