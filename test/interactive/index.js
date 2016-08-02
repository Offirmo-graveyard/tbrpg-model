#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

////////////////////////////////////////////////////////////

const _ = require('lodash');
const vorpal = require('vorpal')()
const prettyjson = require('prettyjson')
var columnify = require('columnify')

const MUT = require('../unit/src')

////////////////////////////////////////////////////////////

const APP_ID = 'TBRPG model'
vorpal.history(APP_ID)
vorpal.localStorage(APP_ID)

vorpal.delimiter('test>')

vorpal.log('\nHello from vorpal-based interactive tests !')
vorpal.log('\nAvailable models:\n' + prettyjson.render(Object.keys(MUT)) + '\n')

vorpal
.command('model <model> <cmd>', 'display infos about the target model')
.action(function(args, callback) {
	const model = MUT[args.model]
	if (!model) {
		console.error(`! unknown model "${args.model}"`)
		return callback()
	}

	//const schema = require(`tbrpg-data/data/${args.model}/schema.json`)
	const schema = model.schema
	const columns = Object.keys(schema.properties)

	switch(args.cmd) {
		case 'info':
			console.log('Schema:\n~~~~~~~\n' + prettyjson.render(schema) + '\n~~~~~~~')
			break
		case 'raw':
			const raw_data = require(`tbrpg-data/data/${args.model}`)

			const columns = columnify(raw_data, {
				truncate: true,
				columnSplitter: ' | ',
				config: {}
			})
			console.log(columns)
			/*
			const header = _.map(schema.properties, (val, key) => ({
				value: key,
				align : 'left',
			}))
			 const t = Table(header,raw_data, {
				borderColor : "blue",
				paddingBottom : 0,
			})
			console.log(t.render())
			*/
			break
		default:
			console.error(`! unknown cmd "${args.cmd}"`)
	}
	callback()
})


vorpal.show()

vorpal.ui.input('model weapon_component raw')
