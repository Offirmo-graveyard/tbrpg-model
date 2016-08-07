#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

const prettyjson = require('prettyjson')

import * as model from '../../src'

import * as loader from '../../src/utils/static-data-loader'

const static_weapon_component_data = require(`tbrpg-static-data/data/weapon_component`)

console.log('Exported =\n' + prettyjson.render(model))

let weapon_component_1: model.weapon_component.IWeaponComponent

weapon_component_1 = model.weapon_component.create({
	id: 'foo',
	i18n_key: 'foo'
})

console.log('weapon_component_1\n' + prettyjson.render(weapon_component_1))

console.log('weapon components\n' + prettyjson.render(
		loader.load_from_static_data<model.weapon_component.IWeaponComponent>(
			model.weapon_component.instantiate_module(),
			static_weapon_component_data,
			{
				i18n_radix: 'weapon_'
			}
		)
	)
)
