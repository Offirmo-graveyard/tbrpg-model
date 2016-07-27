#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

import * as model from '../../src'

console.log('Hello', model)

let armor1: model.ArmorComponent

armor1 = model.build_armor_component({})

console.log(armor1)
