import { Kernel } from "inversify"

import {
	LokiDb,
} from './index'

import { kernel_module as weapon_component_kernel_module } from '../models/weapon_component/_inversify_module'
import { kernel_module as adventure_archetype_kernel_module } from '../models/adventure_archetype/_inversify_module'
import { RSRCIDS, kernel_module } from './_inversify_module'

describe('TBRPG Store', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(weapon_component_kernel_module, adventure_archetype_kernel_module, kernel_module)
		return kernel
	}

	function make_db(): LokiDb {
		const kernel = make_kernel()
		const model = kernel.get<() => IStore>(RSRCIDS.model)
		return factory()
	}

	it('should have a proper initial state', () => {
		const store = make_store()
		const state = store.getState()
		expect(state).to.have.property('click_count', 0)
		expect(state).to.have.deep.property('internal.prng')
	})
})
