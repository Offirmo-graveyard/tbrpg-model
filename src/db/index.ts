////////////////////////////////////

import * as _ from 'lodash'

////////////

// static data
import {
	IAdventureArchetype,
	IAdventureArchetypeCreationParams,
	AdventureArchetypeModel
} from '../models/adventure_archetype'
import {
	IItemQuality,
	IItemQualityCreationParams,
	ItemQualityModel
} from '../models/item_quality'
import {
	IWeaponComponent,
	IWeaponComponentCreationParams,
	WeaponComponentModel
} from '../models/weapon_component'

////////////

import { IStaticData } from './types'

////////////

interface InjectableDependencies {
	adventure_archetype_model: AdventureArchetypeModel
	adventure_archetype_static_data: IAdventureArchetypeCreationParams[]
	item_quality_model: ItemQualityModel
	item_quality_static_data: IItemQualityCreationParams[]
	weapon_component_model: WeaponComponentModel
	weapon_component_static_data: IWeaponComponentCreationParams[]
}

////////////////////////////////////

function factory(dependencies: InjectableDependencies): IStaticData {
	const {
		adventure_archetype_model,
		adventure_archetype_static_data,
		item_quality_model,
		item_quality_static_data,
		weapon_component_model,
		weapon_component_static_data
	} = dependencies

	const adventure_archetype_all: IAdventureArchetype[] = adventure_archetype_static_data.map(adventure_archetype_model.create)
	const item_quality_all: IItemQuality[] = item_quality_static_data.map(item_quality_model.create)
	const weapon_component_all: IWeaponComponent[] = weapon_component_static_data.map(weapon_component_model.create)

	return {
		adventure_archetype: {
			all: adventure_archetype_all,
			good: _.filter(adventure_archetype_all, {good: true}),
			bad: _.filter(adventure_archetype_all, {good: false}),
		},
		item_quality: {
			all: item_quality_all
		},
		weapon_component: {
			all: weapon_component_all,
			base: _.filter(weapon_component_all, {type: 'base'}),
			qualifier_1: _.filter(weapon_component_all, {type: 'qualifier1'}),
			qualifier_2: _.filter(weapon_component_all, {type: 'qualifier2'}),
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
