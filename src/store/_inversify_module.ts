////////////////////////////////////

import { KernelModule, interfaces } from "inversify"

////////////

import { IStore, factory as store_factory } from './index'
import { IReducer, factory as reducer_factory } from './reducer'

import {
	SagaModel,
	RSRCIDS as SAGA_RSRCIDS
} from '../models/saga/_inversify_module'

import {
	IStaticData,
	RSRCIDS as DB_RSRCIDS
} from '../db/_inversify_module'

////////////////////////////////////

const RSRCIDS = {
	reducer: Symbol('reducer'),
	store: Symbol('store'),
}

////////////

const kernel_module = new KernelModule((bind: interfaces.Bind) => {

	bind<IReducer>(RSRCIDS.reducer)
		.toDynamicValue((context: interfaces.Context) => reducer_factory({
			saga_model: context.kernel.get<SagaModel>(SAGA_RSRCIDS.model),
			static_data: context.kernel.get<IStaticData>(DB_RSRCIDS.static.all),
		}))

	bind<IStore>(RSRCIDS.store)
		.toDynamicValue((context: interfaces.Context) => store_factory({
			saga_model: context.kernel.get<SagaModel>(SAGA_RSRCIDS.model),
			static_data: context.kernel.get<IStaticData>(DB_RSRCIDS.static.all),
		}))
})

export {
	RSRCIDS,
	kernel_module,
	IReducer,
	IStore,
}

////////////////////////////////////
