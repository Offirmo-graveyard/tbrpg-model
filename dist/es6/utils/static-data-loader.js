const _ = require('lodash');
/**
 *
 * @param Model -
 * @param raw_data_by_id - a hash by id
 */
export function load_from_static_data(model, raw_data_by_id, options = {}) {
    let i18n_keys;
    let data = _.toPairs(raw_data_by_id).map((params) => {
        const [key, value] = params;
        console.log(params, key, value);
        if (key[0] === '_')
            return; // leading _ means "commented out"
        let data = {
            id: key,
            i18n_key: value.i18n_key || ((options.i18n_radix || '') + key)
        };
        return data;
    });
    let models = _.compact(data).map(model.create);
    return models;
}
//# sourceMappingURL=static-data-loader.js.map