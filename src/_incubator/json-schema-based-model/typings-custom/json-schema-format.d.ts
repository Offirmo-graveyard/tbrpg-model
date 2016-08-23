// using typescript 2 wildcard

import { IJsonSchemaExtended } from '../types'

// Note working. TODO report
declare module '*!json-schema' {
	const schema: string
	export default schema
}
