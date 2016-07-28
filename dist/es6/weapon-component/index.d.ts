declare const _schema: any;
export interface InjectableDependencies {
    lodash?: any;
    jsen?: any;
    schema?: any;
}
import { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams } from './types';
export declare function instantiate_module(dependencies?: InjectableDependencies): {
    create: (rawData: IWeaponComponentCreationParams) => IWeaponComponent;
    validate: (data: IWeaponComponent) => void;
};
export declare const create: (rawData: IWeaponComponentCreationParams) => IWeaponComponent;
export declare const validate: (data: IWeaponComponent) => void;
export { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams, _schema as schema };
