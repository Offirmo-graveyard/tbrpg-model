////////////////////////////////////

import { KernelModule } from "inversify"

////////////

import { modules as db_kernel_modules } from '../db/_inversify_needed_modules'
import { modules as saga_kernel_modules } from '../models/saga/_inversify_needed_modules'
import { kernel_module } from './_inversify_module'

////////////////////////////////////

const modules = new Set([
	...db_kernel_modules,
	...saga_kernel_modules,
	kernel_module
])

////////////////////////////////////

export {
	KernelModule,
	modules
}

////////////////////////////////////
