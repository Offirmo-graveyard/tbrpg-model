/** A user's saga = full game state
 */

////////////////////////////////////

import {
	Store as ReduxStore,
	createStore
} from 'redux'

////////////

export interface InjectableDependencies {
	instantiate_json_schema_based_model?: any
	schema?: any
}

////////////

import { ISaga } from './types'
import { reducer } from './reducer'

////////////////////////////////////

function create_store(): ReduxStore<ISaga> {
	const store = createStore(reducer)

	return store
}

const default_store = create_store()

////////////

// primitives
// * sort the inventory 1) equiped W -> A 2) unequiped W+A, by dmg 3) misc objects
// *
////////////////////////////////////

export {
create_store,
default_store,
}

////////////////////////////////////
