/** A user's saga = full game state
 */

////////////////////////////////////

import {
	Action as ReduxAction,
	Reducer as ReduxReducer,
	Store as ReduxStore,
	createStore
} from 'redux'

////////////

import {
	IJsonSchemaModel,
	instantiate_model as _instantiate_json_schema_based_model
} from '../_incubator/json-schema-based-model'

import { ISaga, ISagaCreationParams } from './types'
import {
	IActionSetRandomSeed,
	on_set_random_seed
} from './actions'
//const _schema = require('./schema.json')
import _schema from './schema.json!json'

////////////

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: any
}

////////////

type SagaModel = IJsonSchemaModel<ISaga, ISagaCreationParams>

////////////////////////////////////

function create_instance(dependencies: InjectableDependencies = {}): SagaModel {
	const instantiate_json_schema_based_model = (dependencies.instantiate_json_schema_based_model || _instantiate_json_schema_based_model) as typeof _instantiate_json_schema_based_model
	const schema = (dependencies.schema || _schema) as typeof _schema

	return instantiate_json_schema_based_model<ISaga, ISagaCreationParams>(schema)
}

const default_instance = create_instance()

////////////

const initial_state: ISaga = {
	random_seed: 1234,
	random_count: 0,
	click_count: 0,
	valid_click_count: 0,
	next_allowed_click_date_moment_utc: 0,
	stats: {
		level: 1,
		health: 1,
		mana: 0,
		strength: 1,
		agility: 1,
		vitality: 1,
		wisdom: 1,
		luck: 1
	},
	currencies: {
		coins: 0,
		tokens: 0
	},
	inventory:[],
	skills: [],
	flags: {
		recent_adventure_ids: []
	}
}

////////////

function create_store(): ReduxStore<ISaga> {
	const reducer: ReduxReducer<ISaga> = (state: ISaga = initial_state, action: ReduxAction): ISaga => {
		// quick check
		default_instance.validate(store.getState())

		switch (action.type) {
			case 'set_random_seed':
				return on_set_random_seed(state, action as IActionSetRandomSeed)
			default:
				throw new Error('Unknown action !')
		}
	}



	const store = createStore(reducer)

	// quick check
	default_instance.validate(store.getState())

	return store
}

const default_store = create_store()

////////////////////////////////////

export {
	ISaga,
	ISagaCreationParams,
	SagaModel,
	_schema as schema,
	default_instance,
	create_instance,
}

////////////////////////////////////
