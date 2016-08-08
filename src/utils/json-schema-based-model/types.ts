
export interface IJsonSchemaTypeDescription {
	description: string
	type: string
	properties: {
		[k: string]: IJsonSchemaTypeDescription
	}
}

export interface IOffirmoJsonSchemaExtension {
	hid: string
	human_unique_key_components: string[]
	i18n_keys_mandatory: Object // TODO
	i18n_keys_optional: Object
}

export interface IJsonSchema {
	title: string
	type: any
	additionalProperties: boolean
	required: string[]
	offirmo_extensions: IOffirmoJsonSchemaExtension
	properties: {
		[k: string]: IJsonSchemaTypeDescription
	}
}

export interface IJsonSchemaModel<IModel, IModelCreationParams> {
	create: (rawData: IModelCreationParams) => IModel
	validate: (data: IModel) => void
	schema: IJsonSchema
	get_human_unique_key: (data: IModel) => string
}
