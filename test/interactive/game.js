'use strict';

const TBRPG = require('../unit/src')

const store = TBRPG.store.default_store

store.subscribe(() => console.log('* Game state change detected ! (from game)'))

store.dispatch({
	type: 'set_random_seed',
	seed: 1234,
})


module.exports = {
	store
}
