declare type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality';
interface IWeaponComponent {
    id: string;
    i18n_key: string;
    type: WeaponComponentType;
    affinities?: any;
}
interface IWeaponComponentCreationParams {
    id: string;
    i18n_key: string;
    type?: WeaponComponentType;
    affinities?: any;
}
export { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams };
