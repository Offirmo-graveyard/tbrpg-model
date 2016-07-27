(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.tbrpg_model = global.tbrpg_model || {})));
}(this, function (exports) { 'use strict';

    //import * as jsen from 'jsen'
    //import jsen = require('jsen')
    //import { jsen } from 'jsen'
    var jsen = require('jsen');
    var schema = require('./schema.json');
    ////////////
    //export default function module() {
    var is_schema_valid = jsen({ '$ref': 'http://json-schema.org/draft-04/schema#' })(schema);
    if (!is_schema_valid) throw new Error('Adventure model : internal schema is invalid !');
    var _validate = jsen(schema, {
        greedy: true,
        formats: {}
    });
    var build = _validate.build;

    //import jsen = require('jsen')
    //import jsen from 'jsen'
    //import * as jsen from 'jsen'
    //import { jsen } from 'jsen'
    var jsen$1 = require('jsen');
    var schema$1 = require('./schema.json');
    ///////
    //export default function module() {
    var is_schema_valid$1 = jsen$1({ '$ref': 'http://json-schema.org/draft-04/schema#' })(schema$1);
    if (!is_schema_valid$1) throw new Error('Adventure model : internal schema is invalid !');
    var _validate$1 = jsen$1(schema$1, {
        greedy: true,
        formats: {}
    });
    var build$1 = _validate$1.build;

    exports.weapon_component_schema = schema;
    exports.build_weapon_component = build;
    exports.armor_component_schema = schema$1;
    exports.build_armor_component = build$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tbrpg_model.umd.js.map
