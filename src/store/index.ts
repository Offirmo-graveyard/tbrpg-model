/** A user's saga reducer
 */

////////////////////////////////////

import {
	Store as ReduxStore,
	createStore
} from 'redux'

////////////

import { IState } from './types'
import {
	InjectableDependencies as ReducerInjectableDependencies,
	factory as reducer_factory
} from './reducer'

////////////

interface InjectableDependencies extends ReducerInjectableDependencies {
}

////////////////////////////////////

function factory(dependencies: InjectableDependencies): ReduxStore<IState> {
	const reducer = reducer_factory(dependencies)
	const store = createStore<IState>(reducer)

	return store
}

////////////

// primitives
// * sort the inventory 1) equiped W -> A 2) unequiped W+A, by dmg 3) misc objects
// *
////////////////////////////////////

export {
	InjectableDependencies,
	factory,
}

////////////////////////////////////
