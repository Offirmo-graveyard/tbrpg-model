/// <reference types="chai" />
export interface IModel<I> {
    create(data: Object): I;
    validate(data: I): void;
}
export interface IOptions {
    i18n_radix?: string;
}
/**
 *
 * @param Model -
 * @param raw_data_by_id - a hash by id
 */
export declare function load_from_static_data<I>(model: IModel<I>, raw_data_by_id: Object, options?: IOptions): any;
