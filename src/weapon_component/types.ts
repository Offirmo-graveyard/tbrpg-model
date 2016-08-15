////////////////////////////////////

//import { ITBRPGModel } from '../types'

////////////////////////////////////

type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality'
//type WeaponQualityType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'

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
	//WeaponQualityType,
	IWeaponComponent,
	IWeaponComponentCreationParams
}

////////////////////////////////////
