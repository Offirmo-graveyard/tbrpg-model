////////////

const _jsen = require('jsen')
const _schema = require('./schema.json')

export interface InjectableDependencies {
	jsen?: any
	schema?: any
}

////////////

import { WeaponComponent, WeaponComponentType } from './types'

////////////


export default function module(dependencies: InjectableDependencies = {}) {
	const jsen = dependencies.jsen || _jsen
	const schema = dependencies.schema || _schema

	const is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema)
	if (! is_schema_valid) throw new Error('Adventure model : internal schema is invalid !')

	const _validate = jsen(schema, {
		greedy: true,
		formats: {},
	})
	const _build = _validate.build

	function validate(data: Object) {
		const err: any = new Error('Adventure model : provided data are invalid !')
		err.bad_data = _.cloneDeep(data)
		err.validation_errors = []

		// jsen validation
		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors)
			console.error('Adventure model : validation error !', err.bad_data, err.validation_errors)
			throw err
		}

		// additional validations
	}

	function build(data: WeaponComponent = {}) {
		// reminder: jsen build creates a copy of data by default
		data = _build(data, { additionalProperties: false })
		validate(data)
		return data
	}

	return {
		build,
		validate
	}
}

const default_instance = module()
export const build_weapon_component = default_instance.build


export {
	WeaponComponentType,
	WeaponComponent,
	_schema as weapon_component_schema,
}


//}



/*




/////// Methods ///////
function Adventure(data) {
	data = build(data || {}, { additionalProperties: false });
	validate(data);

	_.defaults(this, data);
}

Adventure.prototype.get = function () {
	var data = build(this); // REM : perform a copy

	if (data.gains.weapon)
		data.gains.weapon = data.gains.weapon.get();

	if (data.gains.armor)
		data.gains.armor = data.gains.armor.get();

	return data;
};

Adventure.create = function(data) {
	return new Adventure(data);
};
*/
