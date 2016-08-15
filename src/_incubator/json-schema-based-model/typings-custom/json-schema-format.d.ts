// using typescript 2 wildcard

import { IJsonSchema } from '../types'

// Note working. TODO report
declare module '*!json-schema' {
	const schema: string
	export default schema
}
