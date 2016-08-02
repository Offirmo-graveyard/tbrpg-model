
type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality'

interface IWeaponComponent {
	id: string
	i18n_radix: string
	type: WeaponComponentType
}

interface IWeaponComponentCreationParams {
	id: string
	i18n_radix: string
	type?: WeaponComponentType
}

export { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams }
