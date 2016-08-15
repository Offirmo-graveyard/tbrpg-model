////////////////////////////////////

import {
	Action as ReduxAction,
} from 'redux'

////////////

import { ISaga } from './types'

////////////////////////////////////

//type ActionType = 'set_random_seed' | 'click' | 'equip_inventory_item' | 'sell_inventory_item'

////////////

interface IActionSetRandomSeed extends ReduxAction {
	seed: number
}

function on_set_random_seed(state: ISaga, action: IActionSetRandomSeed) {
	state.random_seed = action.seed
	state.random_count = 0

	return state
}

////////////////////////////////////

export {
	IActionSetRandomSeed,
	on_set_random_seed
}

////////////////////////////////////

/*
 import {
 ACTIVATE_LOCATION
 } from './actions';

 import { Map } from 'immutable';

 const initialState = Map({})

 export let ui = (state = initialState, action) => {
 switch (action.type) {
 case ACTIVATE_LOCATION:
 return state.set('activeLocationId', action.id);
 default:
 return state;
 }
 };
 */
