#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

////////////////////////////////////

const moment = require('moment')

////////////

const { factory } = require('../unit/src')
const store = factory()

////////////////////////////////////

store.subscribe(() => console.log('* Game state change detected ! (from game)', store.getState()))

store.dispatch({
	type: 'set_random_seed',
	seed: 1234,
})

store.dispatch({
	type: 'play',
	click_date_moment_utc: moment.utc(),
})
