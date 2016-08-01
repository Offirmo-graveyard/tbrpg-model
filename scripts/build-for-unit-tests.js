#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

const _ = require('lodash')
const fs = require('fs-extra')

const tsc = require('node-typescript-compiler')
const package = {
	json: require('../../../package.json')
}
const tsconfig = {
	json: require('../../../tsconfig.json')
}

console.log(`* Building module for testing..`)

function debug_promise(p, target) {
	p.then(
		() => console.log('* ' + target + ' ✓'),
		(err) => console.error('! ' + target + ' ❌\n\n!!!!!!!!\n', err)
	)
}

Promise.resolve()
.then(() => {
	// Clean up the output directory
	fs.emptyDirSync('test/unit/src')
})
.then(transpile_typescript_to_es5)
.then(() => console.log('SUCCESS'), console.error)

function transpile_typescript_to_es5() {
	const files = tsc.compile(Object.assign({}, tsconfig.json.compilerOptions, {
			'module': 'CommonJS',
			'outDir': 'test/unit/src'
		}
	))

	debug_promise(files, 'typescript -> ES6@CommonJs')

	return files
}
