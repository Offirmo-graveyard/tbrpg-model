////////////////////////////////////

import { IJsonSchema } from './types'

////////////////////////////////////

const KEY_SEPARATOR = '|'

////////////////////////////////////

function create_human_unique_key_builder<IModel>(schema: IJsonSchema): (data: IModel) => string {
	const model_hid = schema.offirmo_extensions.hid
	const primary_key_components = schema.offirmo_extensions.human_unique_key_components

	return (data: IModel) => [
		model_hid,
		primary_key_components.map(key => ((data as any)[key] as string)).join(',')
	].join(KEY_SEPARATOR)
}

////////////////////////////////////

export {
	create_human_unique_key_builder
}

