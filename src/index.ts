////////////////////////////////////

import { Kernel } from "inversify"

////////////

import { kernel_modules, RSRCIDS } from './_inversify_module'

////////////////////////////////////

function factory() {
	const kernel = new Kernel()
	kernel.load(...kernel_modules)

	const store = kernel.get(RSRCIDS.store.store)

	return store
}

////////////////////////////////////

export {
	factory
}

////////////////////////////////////
