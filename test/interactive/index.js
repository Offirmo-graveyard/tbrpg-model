#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

////////////////////////////////////////////////////////////

const clear_cli = require('@offirmo/cli-toolbox/stdout/clear-cli')
clear_cli()

//const _ = require('lodash');
const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')()
const prettify_json = require('@offirmo/cli-toolbox/string/prettify-json')
const columnify = require('@offirmo/cli-toolbox/string/columnify')
const stylizeString = require('@offirmo/cli-toolbox/string/stylize-string')

const MUT = require('../unit/src')

////////////////////////////////////////////////////////////

const APP_ID = 'TBRPG model'
vorpal.history(APP_ID)
vorpal.localStorage(APP_ID)

vorpal.log('\nHello from vorpal-based interactive tests !');
vorpal.log('\nAvailable models:\n' + prettify_json(Object.keys(MUT)) + '\n');


vorpal
.command('x', 'clear screen')
.autocomplete(Object.keys(MUT))
.action((args, callback) => {
	clear_cli()
	return callback()
})

vorpal
.command('model <model> <cmd>', 'display infos about the target model')
.autocomplete(Object.keys(MUT))
.action((args, callback) => {
	const model = MUT[args.model]
	//console.log(model)
	if (!model) {
		console.error(`! unknown model "${args.model}"`)
		return callback()
	}

	var model_instance = model.default_instance

	const schema = model_instance.schema
	const keys = Object.keys(schema.properties)

	switch(args.cmd) {

		case 'info':
			console.log('Schema:\n~~~~~~~\n' + prettify_json(schema) + '\n~~~~~~~')
			break

		case 'raw':
			const raw_data = require(`tbrpg-static-data/src/${args.model}`)

			const columns = columnify(
				raw_data
					.map(model_instance.get_human_unique_key)
					.map(s => s.slice(schema.offirmo_extensions.hid.length +1))
			)
			console.log(columns)
			break

		default:
			console.error(`! unknown cmd "${args.cmd}"`)
	}
	callback()
});


vorpal
	.delimiter(stylizeString.red('test>'))
	.show();

vorpal.ui.input('model weapon_component raw')

