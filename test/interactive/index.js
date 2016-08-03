#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

////////////////////////////////////////////////////////////

require('@offirmo/cli-toolbox/output/clear-cli')()

//const _ = require('lodash');
const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')()
const prettify_json = require('@offirmo/cli-toolbox/output/prettify-json')
const columnify = require('@offirmo/cli-toolbox/output/columnify')
const MUT = require('../unit/src')

////////////////////////////////////////////////////////////

const APP_ID = 'TBRPG model'
vorpal.history(APP_ID)
vorpal.localStorage(APP_ID)

vorpal.log('\nHello from vorpal-based interactive tests !');
vorpal.log('\nAvailable models:\n' + prettify_json(Object.keys(MUT)) + '\n');

vorpal
.command('model <model> <cmd>', 'display infos about the target model')
.autocomplete(Object.keys(MUT))
.action(function(args, callback) {
	const model = MUT[args.model]
	if (!model) {
		console.error(`! unknown model "${args.model}"`)
		return callback()
	}

	//const schema = require(`tbrpg-data/data/${args.model}/schema.json`)
	const schema = model.schema
	const keys = Object.keys(schema.properties)

	switch(args.cmd) {
		case 'info':
			console.log('Schema:\n~~~~~~~\n' + prettify_json(schema) + '\n~~~~~~~')
			break
		case 'raw':
			const raw_data = require(`tbrpg-data/data/${args.model}`)

			const columns = columnify(raw_data, {
				truncate: true,
				columnSplitter: ' | ',
				config: {}
			})
			console.log(columns)
			break
		default:
			console.error(`! unknown cmd "${args.cmd}"`)
	}
	callback()
});

vorpal
	.delimiter('test>')
	.show();

vorpal.ui.input('model weapon_component raw')
