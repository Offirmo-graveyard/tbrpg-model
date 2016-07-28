const _ = require('lodash')


export interface IModel<I>{
	create(data: Object): I
	validate(data: I): void
}

export interface IOptions {
	i18n_radix?: string
}

/**
 *
 * @param Model -
 * @param raw_data_by_id - a hash by id
 */
export function load_from_static_data<I>(model: IModel<I>, raw_data_by_id: Object, options: IOptions = {}) {
	let i18n_keys: string[]

	let data = _.toPairs(raw_data_by_id).map((params: [string, any]) => {
		const [key, value] = params
		console.log(params, key, value)
		if (key[0] === '_') return // leading _ means "commented out"

		let data = {
			id: key,
			i18n_key: value.i18n_key || ((options.i18n_radix || '') + key)
		}

		return data
	})

	let models = _.compact(data).map(model.create)

	return models
}
