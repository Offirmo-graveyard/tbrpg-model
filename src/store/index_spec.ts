import { Kernel } from "inversify"

import {
	IStore,
} from './index'

import { RSRCIDS } from './_inversify_module'
import { modules } from './_inversify_needed_modules'

describe('TBRPG Store', function() {

	function make_kernel() {
		const kernel = new Kernel()
		kernel.load(...modules)
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
