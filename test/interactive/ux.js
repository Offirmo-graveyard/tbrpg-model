'use strict';

////////////////////////////////////////////////////////////

const prettify_json = require('@offirmo/cli-toolbox/string/prettify-json')

////////////////////////////////////////////////////////////

let last_adventure = null

function render(state) {
	console.log('hello')

	const saga = state.saga

	console.log(prettify_json(saga))

	if (last_adventure !== saga.last_adventure) {
		last_adventure = saga.last_adventure
		render_adventure(last_adventure)
	}
}

function render_adventure(a) {
	console.log('TODO render adventure', a)
}

////////////////////////////////////////////////////////////

module.exports = {
	render
}

////////////////////////////////////////////////////////////
