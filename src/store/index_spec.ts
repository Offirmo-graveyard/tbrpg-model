import { Kernel } from "inversify"

import {
	IStore,
} from './index'

import { kernel_module as saga_kernel_module } from '../models/saga/_inversify_module'
import { RSRCIDS, kernel_module } from './_inversify_module'

describe('TBRPG Store', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(saga_kernel_module)
		kernel.load(kernel_module)
		return kernel
	}

	function make_store(): IStore {
		const kernel = make_kernel()
		return kernel.get<IStore>(RSRCIDS.store)
	}

	it('should have a proper initial state', () => {
		const store = make_store()
		const state = store.getState()
		expect(state).to.have.property('click_count', 0)
		expect(state).to.have.deep.property('internal.prng')
	})
})
