#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

const mocha = require('mocha')
const chai = require('chai')
//import sinon_chai from 'sinon-chai'

//mocha

expect = chai.expect

//mocha.checkLeaks()
//chai.use(sinon_chai);

console.log('* Starting tests...')
//mocha.run()
