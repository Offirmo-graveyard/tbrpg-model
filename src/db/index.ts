////////////////////////////////////

import * as _ from 'lodash'

////////////

// static data
import {
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel
} from '../models/weapon_component'

import {
	IAdventureArchetype,
	IAdventureArchetypeCreationParams,
	AdventureArchetypeModel
} from '../models/adventure_archetype'

////////////

import { IStaticData } from './types'

////////////

interface InjectableDependencies {
	adventure_archetype_model: AdventureArchetypeModel
	adventure_archetype_static_data: IAdventureArchetypeCreationParams[]
	weapon_component_model: WeaponComponentModel
	weapon_component_static_data: IWeaponComponentCreationParams[]
}

////////////////////////////////////

function factory(dependencies: InjectableDependencies): IStaticData {
	const {
		adventure_archetype_model,
		adventure_archetype_static_data,
		weapon_component_model,
		weapon_component_static_data
	} = dependencies

	return {
		item_quality: [],
		weapon_components: {
			base: [],
			qualifier_1: [],
			qualifier_2: []
		},
		adventure_archetypes: {
			good: [],
			bad: []
		}
	}
}

////////////////////////////////////

export {
	InjectableDependencies,
	IStaticData,
	factory,
}

////////////////////////////////////
