
//import jsen = require('jsen')
//import jsen from 'jsen'
//import * as jsen from 'jsen'
//import { jsen } from 'jsen'
const jsen = require('jsen')

const schema = require('./schema.json')
/*
import * as schema from './weapon-component.schema.json'
import schema from './weapon-component.schema.json'
export schema from './weapon-component.schema.json'
*/

import { ArmorComponent, ArmorComponentType } from './types'

///////

export default function module() { }

//export default function module() {

const is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema)

if (! is_schema_valid) throw new Error('Adventure model : internal schema is invalid !')

const _validate = jsen(schema, {
	greedy: true,
	formats: {},
})

const build = _validate.build



export {
	ArmorComponentType,
	ArmorComponent,
	schema as armor_component_schema,
	build as build_armor_component,
}


//}



/*

function validate(data) {
	var err = new Error('Adventure model : provided data are invalid !');
	err.bad_data = _.cloneDeep(data);
	err.validation_errors = [];

	if (!_validate(data)) {
		err.validation_errors = _.cloneDeep(_validate.errors);
		console.error('Adventure model : validation error !', err.bad_data, err.validation_errors);
		throw err;
	}
}


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
