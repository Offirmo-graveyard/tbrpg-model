////////////////////////////////////

import { ITBRPGModel } from '../types'

////////////////////////////////////

type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality'

interface IWeaponComponent /* extends ITBRPGModel */ {
	hid: string
	type: WeaponComponentType
}

interface IWeaponComponentCreationParams {
	hid: string
	type?: WeaponComponentType
}

////////////////////////////////////

export {
	WeaponComponentType,
	IWeaponComponent,
	IWeaponComponentCreationParams
}

////////////////////////////////////
