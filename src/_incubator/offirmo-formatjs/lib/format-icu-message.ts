'use strict';

/** Resolve an ICU MessageFormat to a string.
 * http://userguide.icu-project.org/formatparse/messages
 * http://formatjs.io/
 *
 * Design notes :
 * While message resolution may fail, we try to not aggressively fail with a throw,
 * but instead return the "best possible message".
 * We prefer to display the raw key to the user (in UI) rather than nothing.
 */

import * as _ from 'lodash'
//import * as IntlMessageFormat from 'intl-messageformat'
const IntlMessageFormat = require('intl-messageformat')


/**
 *
 * @param message - an ICU MessageFormat string http://userguide.icu-project.org/formatparse/messages
 * @param values
 * @param locale
 * @param custom_formats [not recommended]
 * @returns {String}
 */
function format<T>(message: string, values: T, locale: string = 'en', custom_formats: Object = {}, parent_debug_id: string = '?') {
	// errors while resolving the message
	const errors: string[] = []

	// fix parameters without crashing
	// message: can't be fixed, see later
	if(!_.isString(locale)) {
		errors.push('Invalid locale')
		locale = 'en'
	}
	if(!_.isObject(values)) {
		errors.push('Invalid values')
		values = {} as T
	}
	if(!_.isObject(custom_formats)) {
		errors.push('Invalid custom_formats')
		custom_formats = {}
	}
	if(!_.isString(parent_debug_id)) {
		parent_debug_id = '?'
	}

	// final result
	let formatted_msg = '[unknown localized message]' // for now

	// debugging
	const debug = {
		id: '',
		prefix: '[i18n|' + locale + '|',
		message: message || '???',
		suffix: (parent_debug_id ? ('|' + parent_debug_id) : '') + ']',
		locale: locale,
		values: values
	}
	function update_with_best_available_data_so_far() {
		debug.id = debug.prefix + debug.message + debug.suffix
		formatted_msg = debug.id; // so far : only a debug message
	}
	update_with_best_available_data_so_far()

	// try to resolve stuff
	resolution : {
		if(!_.isString(message)) {
			errors.push('Invalid message')
			break resolution
		}

		let message_format: IntlMessageFormat<T>
		try {
			message_format = new IntlMessageFormat(message, locale, custom_formats)
		}
		catch(err) {
			console.error(debug.id + ' error : unable to parse message format !', err, debug)
			break resolution
		}

		// eventually
		try {
			formatted_msg = message_format.format(values);
		}
		catch(err) {
			console.error(debug.id + ' error : unable to compile message !', err, debug)
			break resolution
		}
	}

	return formatted_msg
}

export {
	format
}
