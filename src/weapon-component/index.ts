////////////////////////////////////

const _lodash = require('lodash')
const _jsen = require('jsen')
const _schema = require('./schema.json')

export interface InjectableDependencies {
	lodash?: any
	jsen?: any
	schema?: any
}

////////////

import { WeaponComponentType, IWeaponComponent, IWeaponComponentCreationParams } from './types'

const MODULE_ID = 'TBRPG model - WeaponComponent'
const ALLOWED_TYPES = [ 'base', 'qualifier1', 'qualifier2', 'quality' ]

////////////////////////////////////


export function instantiate_module (dependencies: InjectableDependencies = {}) {
	const _ = (dependencies.lodash || _lodash) as typeof _lodash
	const jsen = (dependencies.jsen || _jsen) as typeof _jsen
	const schema = (dependencies.schema || _schema) as typeof _schema

	////////////

	const is_schema_valid = jsen({'$ref': 'http://json-schema.org/draft-04/schema#'})(schema)
	if (! is_schema_valid) throw new Error(MODULE_ID + ' - schema is invalid !')

	////////////

	const _validate = jsen(schema, {
		greedy: true,
		formats: {},
	})

	const _build = _validate.build

	////////////

	function validate (data: IWeaponComponent) {
		const err: any = new Error(MODULE_ID + ' - validate() - provided data are invalid !')
		err.bad_data = _.cloneDeep(data)
		err.validation_errors = []

		// jsen validation
		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors)
			console.error(err.message, err.bad_data, err.validation_errors)
			throw err
		}

		// additional validations
		// ...
	}

	function create (rawData: IWeaponComponentCreationParams) {
		// reminder: jsen build creates a copy of data by default
		const data = _build(rawData, { additionalProperties: false }) as IWeaponComponent

		// to ease building from static data, special type inference :
		data.type = rawData.type || infer_type_from_id(data.id)

		validate(data)

		return data
	}

	function infer_type_from_id(id: string): WeaponComponentType {
		const candidate_type =  id.slice(0, id.indexOf('_'))
		if (_.includes(ALLOWED_TYPES, candidate_type))
			return candidate_type as WeaponComponentType
		else return 'base'
	}

	return {
		create,
		validate
	}
}

const default_instance = instantiate_module()

////////////////////////////////////

export const create = default_instance.create
export const validate = default_instance.validate

export {
	WeaponComponentType,
	IWeaponComponent,
	IWeaponComponentCreationParams,
	_schema as schema
}

////////////////////////////////////
