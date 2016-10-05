// for unit tests only, do not use !!!

////////////////////////////////////

import { Action as ReduxAction } from 'redux'

////////////

import { IState } from '../types'

////////////////////////////////////

interface IActionTest_XXX extends ReduxAction {
	type: 'test_xxx'
	// a custom state-manipulating func ;-)
	op: (state: IState) => IState
}

function on_test_xxx(state: IState, action: IActionTest_XXX): IState {
	return action.op(state)
}

////////////////////////////////////

export {
	IActionTest_XXX,
	on_test_xxx,
}

////////////////////////////////////
