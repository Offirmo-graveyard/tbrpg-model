
import { IWeaponComponent } from '../weapon_component'

interface IWeapon {
	base: IWeaponComponent
	qualifier1: IWeaponComponent
	qualifier2: IWeaponComponent
	quality: IWeaponComponent
	base_strength: number
	enhancement_level: number
}

interface IWeaponCreationParams {
	base: IWeaponComponent
	qualifier1: IWeaponComponent
	qualifier2: IWeaponComponent
	quality: IWeaponComponent
	base_strength: number
	enhancement_level?: number
}

export { IWeapon, IWeaponCreationParams }
