////////////////////////////////////

import * as _ from 'lodash'
import * as jsen from 'jsen'

////////////

import {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel
} from './types'
import { create_human_unique_key_builder } from './get_unique_key'
//import { create_i18n_keys_builder } from './get_i18n_keys'

////////////////////////////////////

function instantiate_model<IModel, IModelCreationParams>(
	schema: IJsonSchemaExtended
): IJsonSchemaBasedModel<IModel, IModelCreationParams> {

	if (!schema || !_.isObject(schema))
		throw new Error('json-schema-based-model: schema is not an object !')
	if (!schema.offirmo_extensions)
		throw new Error('json-schema-based-model: schema is missing offirmo extensions !')

	const MODULE_ID = schema.title
	const hid = schema.offirmo_extensions.hid

	////////////

	const is_schema_valid = jsen({ '$ref': 'http://json-schema.org/draft-04/schema#' })(schema)
	if (!is_schema_valid) throw new Error(MODULE_ID + ' - schema is invalid !')

	////////////

	const _validate = jsen(schema, {
		greedy: true,
		formats: {},
	})

	const _build = _validate.build

	////////////

	function validate(data: IModel): void {
		// prepare the error
		const err: any = new Error(MODULE_ID + ' - validate() - provided data are invalid !')
		err.bad_data = _.cloneDeep(data)
		err.validation_errors = []

		// jsen validation
		if (!_validate(data)) {
			err.validation_errors = _.cloneDeep(_validate.errors)
			/*
			console.error(
				err.message,
				'\n! validation errors:', err.validation_errors,
				'\n!  bad data:', err.bad_data)
			*/
			throw err
		}

		// additional validations
		// TODO one day
	}

	function create(rawData: IModelCreationParams): IModel {
		// reminder: jsen build creates a copy of data by default
		const data = _build(rawData, { additionalProperties: false }) as IModel

		validate(data)

		return data
	}

	return {
		create,
		validate,
		schema,
		hid,
		get_human_unique_key: create_human_unique_key_builder<IModel>(schema),
		//get_i18n_keys: create_i18n_keys_builder
	}
}

////////////////////////////////////

export {
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
	instantiate_model
}

////////////////////////////////////
