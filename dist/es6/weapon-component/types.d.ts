declare type WeaponComponentType = 'base' | 'qualifier1' | 'qualifier2' | 'quality';
interface WeaponComponent {
    id: string;
    i18n_key: string;
    type: WeaponComponentType;
    affinities?: any;
}
export { WeaponComponentType, WeaponComponent };
