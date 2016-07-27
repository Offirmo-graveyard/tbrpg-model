declare const _schema: any;
export interface InjectableDependencies {
    jsen?: any;
    schema?: any;
}
import { WeaponComponent, WeaponComponentType } from './types';
export default function module(dependencies?: InjectableDependencies): {
    build: (base: WeaponComponent) => any;
    validate: (data: Object) => void;
};
export declare const build_weapon_component: (base: WeaponComponent) => any;
export { WeaponComponentType, WeaponComponent, _schema as weapon_component_schema };
