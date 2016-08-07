
export interface IJsonSchemaTypeDescription {
	description: string
	type: string
	properties: Object
}

export interface IOffirmoJsonSchemaExtension {
	hid: string
	primary_key_components: string[]
	i18n_keys_mandatory: Object // TODO
	i18n_keys_optional: Object
}

export interface IJsonSchema {
	title: string
	type: any
	additionalProperties: boolean
	//TODO [string]: IJsonSchemaTypeDescription
	required: string[]
	offirmo_extensions: IOffirmoJsonSchemaExtension
}

export interface IJSBModel<IModel, IModelCreationParams> {
	create: (rawData: IModelCreationParams) => IModel
	validate: (data: IModel) => void
	toString: (data: IModel) => string
}
