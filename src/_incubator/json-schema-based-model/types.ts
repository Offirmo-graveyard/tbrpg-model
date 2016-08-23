////////////////////////////////////

type AllowedType = string | number

// sub-interface of JSON-schema
interface ITypeDescription extends JSON {
	description: string
	type: string
	properties: {
		[k: string]: ITypeDescription
	},
	minimum?: number
	maximum?: number
	default?: AllowedType
}

interface IJsonSchema extends JSON {
	title: string
	type: any
	additionalProperties: boolean
	required: string[]
	properties: {
		[k: string]: ITypeDescription
	}
}

interface IOffirmoExtension {
	hid: string
	human_unique_key_components: string[]
	i18n_keys_mandatory: Object // TODO
	i18n_keys_optional: Object
}

interface IJsonSchemaExtended extends IJsonSchema {
	offirmo_extensions: IOffirmoExtension
}

interface IJsonSchemaBasedModel<IModel, IModelCreationParams> {
	hid: string
	schema: IJsonSchemaExtended
	create: (rawData: IModelCreationParams) => IModel
	validate: (data: IModel) => void
	get_human_unique_key: (data: IModel) => string
}

////////////////////////////////////

export {
	AllowedType,
	ITypeDescription,
	IJsonSchema,
	IOffirmoExtension,
	IJsonSchemaExtended,
	IJsonSchemaBasedModel,
}

////////////////////////////////////
