////////////////////////////////////

const _ = require('lodash')
const jsen = require('jsen')

////////////

import { IJsonSchema, IJSBModel } from './types'
import { create_primary_key_builder } from './primary_key'
//import { create_i18n_keys_builder } from './i18n_keys'

////////////////////////////////////

interface IOptions {
}

function instantiate_model <IModel, IModelCreationParams>(schema: IJsonSchema, options: IOptions = {}): IJSBModel<IModel, IModelCreationParams> {
	const MODULE_ID = schema.title

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

	function validate (data: IModel): void {
		// prepare the error
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
		// TODO one day
	}

	function create (rawData: IModelCreationParams): IModel {
		// reminder: jsen build creates a copy of data by default
		const data = _build(rawData, { additionalProperties: false }) as IModel

		validate(data)

		return data
	}

	return {
		create,
		validate,
		toString: create_primary_key_builder<IModel>(schema),
		//get_i18n_keys: create_i18n_keys_builder
	}
}

////////////////////////////////////


export {
	IJsonSchema,
	IJSBModel,
	IOptions,
	instantiate_model
}

////////////////////////////////////
