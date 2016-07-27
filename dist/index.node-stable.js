'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//import * as jsen from 'jsen'
//import jsen = require('jsen')
//import { jsen } from 'jsen'
const jsen = require('jsen');
const schema = require('./schema.json');
////////////
//export default function module() {
const is_schema_valid = jsen({ '$ref': 'http://json-schema.org/draft-04/schema#' })(schema);
if (!is_schema_valid) throw new Error('Adventure model : internal schema is invalid !');
const _validate = jsen(schema, {
    greedy: true,
    formats: {}
});
const build = _validate.build;

//import jsen = require('jsen')
//import jsen from 'jsen'
//import * as jsen from 'jsen'
//import { jsen } from 'jsen'
const jsen$1 = require('jsen');
const schema$1 = require('./schema.json');
///////
//export default function module() {
const is_schema_valid$1 = jsen$1({ '$ref': 'http://json-schema.org/draft-04/schema#' })(schema$1);
if (!is_schema_valid$1) throw new Error('Adventure model : internal schema is invalid !');
const _validate$1 = jsen$1(schema$1, {
    greedy: true,
    formats: {}
});
const build$1 = _validate$1.build;

exports.weapon_component_schema = schema;
exports.build_weapon_component = build;
exports.armor_component_schema = schema$1;
exports.build_armor_component = build$1;
//# sourceMappingURL=index.node-stable.js.map
