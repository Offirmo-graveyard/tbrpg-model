////////////////////////////////////

import { KernelModule } from "inversify"

////////////

import { kernel_module as adventure_archetype_kernel_module } from '../models/adventure_archetype/_inversify_module'
import { kernel_module as item_quality_kernel_module } from '../models/item_quality/_inversify_module'
import { kernel_module as weapon_component_kernel_module } from '../models/weapon_component/_inversify_module'
import { kernel_module } from './_inversify_module'

////////////////////////////////////

const modules = new Set([
	adventure_archetype_kernel_module,
	item_quality_kernel_module,
	weapon_component_kernel_module,
	kernel_module
])

////////////////////////////////////

export {
	KernelModule,
	modules
}

////////////////////////////////////
