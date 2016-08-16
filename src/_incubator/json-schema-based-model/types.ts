////////////////////////////////////

type AllowedType = string | number

interface IJsonSchemaTypeDescription {
	description: string
	type: string
	properties: {
		[k: string]: IJsonSchemaTypeDescription
	},
	minimum?: number
	maximum?: number
	default?: AllowedType
}

interface IOffirmoJsonSchemaExtension {
	hid: string
	human_unique_key_components: string[]
	i18n_keys_mandatory: Object // TODO
	i18n_keys_optional: Object
}

interface IJsonSchema {
	title: string
	type: any
	additionalProperties: boolean
	required: string[]
	offirmo_extensions: IOffirmoJsonSchemaExtension
	properties: {
		[k: string]: IJsonSchemaTypeDescription
	}
}

interface IJsonSchemaModel<IModel, IModelCreationParams> {
	create: (rawData: IModelCreationParams) => IModel
	validate: (data: IModel) => void
	hid: string
	schema: IJsonSchema
	get_human_unique_key: (data: IModel) => string
	//get_i18n_keys: (data: IModel) => string[]
}

////////////////////////////////////

export {
AllowedType,
IJsonSchemaTypeDescription,
IOffirmoJsonSchemaExtension,
IJsonSchema,
IJsonSchemaModel,
}

////////////////////////////////////
