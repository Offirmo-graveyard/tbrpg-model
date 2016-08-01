////////////////////////////////////
const _lodash = require('lodash');
const _jsen = require('jsen');
const _schema = require('./schema.json');
const MODULE_ID = 'TBRPG model - WeaponComponent';
const ALLOWED_TYPES = ['base', 'qualifier1', 'qualifier2', 'quality'];
////////////////////////////////////
export function instantiate_module(dependencies = {}) {
    const _ = (dependencies.lodash || _lodash);
    const jsen = (dependencies.jsen || _jsen);
    const schema = (dependencies.schema || _schema);
    ////////////
    const is_schema_valid = jsen({ '$ref': 'http://json-schema.org/draft-04/schema#' })(schema);
    if (!is_schema_valid)
        throw new Error(MODULE_ID + ' - schema is invalid !');
    ////////////
    const _validate = jsen(schema, {
        greedy: true,
        formats: {},
    });
    const _build = _validate.build;
    ////////////
    function validate(data) {
        const err = new Error(MODULE_ID + ' - validate() - provided data are invalid !');
        err.bad_data = _.cloneDeep(data);
        err.validation_errors = [];
        // jsen validation
        if (!_validate(data)) {
            err.validation_errors = _.cloneDeep(_validate.errors);
            console.error(err.message, err.bad_data, err.validation_errors);
            throw err;
        }
        // additional validations
        if (ALLOWED_TYPES.indexOf(data.type) < 0) {
            err.validation_errors.push('illegal type');
            console.error(err.message, err.bad_data, err.validation_errors);
            throw err;
        }
    }
    function create(rawData) {
        // reminder: jsen build creates a copy of data by default
        const data = _build(rawData, { additionalProperties: false });
        validate(data);
        return data;
    }
    return {
        create,
        validate
    };
}
const default_instance = instantiate_module();
////////////////////////////////////
export const create = default_instance.create;
export const validate = default_instance.validate;
export { _schema as schema };
////////////////////////////////////
//# sourceMappingURL=index.js.map