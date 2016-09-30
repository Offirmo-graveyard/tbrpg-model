////////////////////////////////////

import { IItemQuality, IItemQualityCreationParams } from '../item_quality'
import { IWeaponComponent, IWeaponComponentCreationParams } from '../weapon_component'

interface IWeapon {
	base: IWeaponComponent
	qualifier1: IWeaponComponent
	qualifier2: IWeaponComponent
	quality: IItemQuality
	base_strength: number
	enhancement_level: number
}

interface IWeaponCreationParams {
	base: IWeaponComponentCreationParams
	qualifier1: IWeaponComponentCreationParams
	qualifier2: IWeaponComponentCreationParams
	quality: IItemQualityCreationParams
	base_strength: number
	enhancement_level?: number
}

////////////////////////////////////

export {
	IWeapon,
	IWeaponCreationParams
}

////////////////////////////////////
