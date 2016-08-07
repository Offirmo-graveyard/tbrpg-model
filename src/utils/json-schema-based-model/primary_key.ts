////////////////////////////////////

import { IJsonSchema } from './types'

////////////////////////////////////

const KEY_SEPARATOR = '|'

////////////////////////////////////

function create_primary_key_builder<IModel>(schema: IJsonSchema): (data: IModel) => string {
	const model_hid = schema.offirmo_extensions.hid
	const primary_key_components = schema.offirmo_extensions.primary_key_components

	return (data: IModel) => [
		model_hid,
		primary_key_components.map((key: string) => ((data as any)[key] as string)).join(',')
	].join(KEY_SEPARATOR)
}

////////////////////////////////////

export {
	create_primary_key_builder
}

