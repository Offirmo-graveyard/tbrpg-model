////////////////////////////////////

type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality'

interface IWeaponComponent {
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
