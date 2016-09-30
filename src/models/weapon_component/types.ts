////////////////////////////////////

type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2'

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
