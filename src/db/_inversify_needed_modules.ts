////////////////////////////////////

import { KernelModule } from "inversify"

////////////

import { modules as adventure_archetype_kernel_modules } from '../models/adventure_archetype/_inversify_needed_modules'
import { modules as item_quality_kernel_modules } from '../models/item_quality/_inversify_needed_modules'
import { modules as weapon_component_kernel_modules } from '../models/weapon_component/_inversify_needed_modules'
import { kernel_module } from './_inversify_module'

////////////////////////////////////

const modules = new Set([
	...adventure_archetype_kernel_modules,
	...item_quality_kernel_modules,
	...weapon_component_kernel_modules,
	kernel_module
])

////////////////////////////////////

export {
	KernelModule,
	modules
}

////////////////////////////////////
