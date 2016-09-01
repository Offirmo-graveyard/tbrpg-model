////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import * as Store from './index'
import * as Reducer from './reducer'

import { SagaModel } from '../models/saga'
import { RSRCIDS as SAGA_RSRCIDS } from '../models/saga/_inversify_module'

////////////////////////////////////

const RSRCIDS = {
	reducer_factory: Symbol('reducer_factory'),
	factory: Symbol('factory'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<interfaces.Factory<Reducer.IReducer>>(RSRCIDS.reducer_factory)
		.toFactory<Reducer.IReducer>((context: interfaces.Context) => () => Reducer.factory({
			saga_model: context.kernel.get<() => SagaModel>(SAGA_RSRCIDS.factory)()
		}))

	bind<interfaces.Factory<Store.IStore>>(RSRCIDS.factory)
		.toFactory<Store.IStore>((context: interfaces.Context) => () => Store.factory({
			saga_model: context.kernel.get<() => SagaModel>(SAGA_RSRCIDS.factory)()
		}))
})

export {
	RSRCIDS,
	kernel_module
}

////////////////////////////////////
