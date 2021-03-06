#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"
'use strict';

////////////////////////////////////////////////////////////

const clear_cli = require('@offirmo/cli-toolbox/stdout/clear-cli')
clear_cli()

// thank you http://patorjk.com/software/taag/#p=display&h=3&v=0&f=Rectangles&t=Online%20%20Adventures
const displayInAsciiArtFont = require('@offirmo/cli-toolbox/stdout/display_in_ascii_art_font')

displayInAsciiArtFont('TBRPG reloaded', {colors: ['yellow', 'candy']})
console.log('\n' +
	' _____       _  _              _____    _                 _                        \n' +
	'|     | ___ | ||_| ___  ___   |  _  | _| | _ _  ___  ___ | |_  _ _  ___  ___  ___  \n' +
	'|  |  ||   || || ||   || -_|  |     || . || | || -_||   ||  _|| | ||  _|| -_||_ -| \n' +
	'|_____||_|_||_||_||_|_||___|  |__|__||___| \\_/ |___||_|_||_|  |___||_|  |___||___| \n' +
	'                                                                                   \n'
)

////////////

const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')()
const prettify_json = require('@offirmo/cli-toolbox/string/prettify-json')
const columnify = require('@offirmo/cli-toolbox/string/columnify')
const stylizeString = require('@offirmo/cli-toolbox/string/stylize')

////////////

const game = require('./game')

////////////

const ux = require('./ux')

////////////////////////////////////////////////////////////

game.store.subscribe(() => ux.render(game.store.getState()))


/*
let intl
icu_container.on_locale_change(i => {
	intl = i

	console.log(`* Switched locale to "${intl.locale}", ${Object.keys(intl.messages).length} keys found.`)
	//console.log(columnify(Object.keys(intl.messages)))
	const greetings = format_key.format('hello', {}, intl)
	console.log(greetings)
})
*/

////////////
const APP_ID = 'TBRPG model'
vorpal.history(APP_ID)
vorpal.localStorage(APP_ID)

vorpal.log('\nHello from vorpal-based TBRPG UX !');
//vorpal.log('\nAvailable models:\n' + prettify_json(Object.keys(TBRPG)) + '\n');

////////////

vorpal
.command('x', 'clear screen')
.action((args, callback) => {
	clear_cli()
	return callback()
})

////////////

vorpal
.command('p', 'go on an adventure')
.action((args, callback) => {

	game.play()

	return callback()
})

////////////

/*
vorpal
.command('set_locale <locale>', 'change locale')
.autocomplete(TBRPG.supported_locales)
.action((args, callback) => {
	const messages = 	Object.assign({}, require('./i18n/' + args.locale), TBRPG.get_i18n_data(args.locale))

	icu_container.set_icu_data(
		args.locale,
		messages
	)

	callback()
})
*/

////////////
/*
vorpal
.command('model <model> <cmd>', 'display infos about the target model')
.autocomplete(Object.keys(TBRPG))
.action((args, callback) => {
	const model = TBRPG.models[args.model]
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

			console.log(columnify(
				raw_data
					.map(model_instance.get_human_unique_key)
					.map(s => s.slice(schema.offirmo_extensions.hid.length + 1))
			))
			break

		case 'demo':
			switch(args.model) {
				case 'weapon':
					const weapon = mechanics.generate_random_demo_weapon()
					console.log(prettify_json(weapon))
					ux.display_weapon(weapon, intl)
					break
				case 'adventure':
					const adventure = mechanics.generate_random_demo_adventure()
					console.log(prettify_json(adventure))
					ux.display_adventure(adventure, intl)
					break

			}

			break

		default:
			console.error(`! unknown cmd "${args.cmd}"`)
	}

	callback()
})
*/

////////////////////////////////////

vorpal
.delimiter(stylizeString.red('test>'))
.show()

//vorpal.exec('set_locale fr')
//vorpal.ui.input('model adventure_archetype raw')
//vorpal.ui.input('model weapon_component raw')
//vorpal.ui.input('model weapon demo')
//vorpal.ui.input('model adventure demo')

////////////////////////////////////
