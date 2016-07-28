#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import mocha from 'mocha'
import chai from 'chai'
//import sinon_chai from 'sinon-chai'


mocha.checkLeaks()
//chai.use(sinon_chai);

console.log('* Starting tests...')
mocha.run()
