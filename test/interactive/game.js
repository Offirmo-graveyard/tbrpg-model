'use strict';

////////////////////////////////////

const moment = require('moment')

console.log(moment(1).utc().format('X'))
console.log(typeof (moment().utc().format('X')))

////////////

const { factory } = require('../unit/src')
const store = factory()

////////////////////////////////////

//store.subscribe(() => console.log('* Game state change detected ! (from game)', store.getState()))

store.dispatch({
	type: 'set_random_seed',
	seed: 1234,
})

function play() {
	store.dispatch({
		type: 'play',
		click_date_unix_timestamp_utc: new Date().getTime(),
	})
}

////////////////////////////////////

module.exports = {
	store,
	play
}

////////////////////////////////////
