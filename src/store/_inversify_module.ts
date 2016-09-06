////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import * as Store from './index'
import * as Reducer from './reducer'

import { SagaModel } from '../models/saga'
import { RSRCIDS as SAGA_RSRCIDS } from '../models/saga/_inversify_module'

////////////////////////////////////

const RSRCIDS = {
	reducer: Symbol('reducer'),
	store: Symbol('store'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<Reducer.IReducer>(RSRCIDS.reducer)
		.toDynamicValue((context: interfaces.Context) => Reducer.factory({
			saga_model: context.kernel.get<SagaModel>(SAGA_RSRCIDS.model)
		}))

	bind<Store.IStore>(RSRCIDS.store)
		.toDynamicValue((context: interfaces.Context) => Store.factory({
			saga_model: context.kernel.get<SagaModel>(SAGA_RSRCIDS.model)
		}))
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
