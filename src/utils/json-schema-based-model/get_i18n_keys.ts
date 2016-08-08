////////////////////////////////////

import { IJsonSchema } from './types'
import { create_human_unique_key_builder } from './get_unique_key'

////////////////////////////////////

const KEY_SEPARATOR = '|'

////////////////////////////////////

function create_i18n_keys_builder<IModel>(schema: IJsonSchema, lang: string) {
	const get_primary_key = create_human_unique_key_builder(schema)

	const mandatory_i18n_keys =
		(schema.offirmo_extensions.i18n_keys_mandatory['*'] || [])
			.concat((schema.offirmo_extensions.i18n_keys_mandatory[lang] || []))

	const optional_i18n_keys =
		(schema.offirmo_extensions.i18n_keys_optional['*'] || [])
			.concat((schema.offirmo_extensions.i18n_keys_optional[lang] || []))

	return (data: IModel) => ({
		mandatory: mandatory_i18n_keys.map((key: string) => get_primary_key(data) + KEY_SEPARATOR + key),
		optional: optional_i18n_keys.map((key: string) => get_primary_key(data) + KEY_SEPARATOR + key),
	})
}


////////////////////////////////////

export {
	create_i18n_keys_builder
}
