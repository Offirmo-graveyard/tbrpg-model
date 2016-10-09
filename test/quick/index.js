#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

const { Kernel } = require('inversify')

const { kernel_modules, RSRCIDS } = require('../unit/src/_inversify_module')

const kernel = new Kernel()
kernel.load(...kernel_modules)

const store = kernel.get(RSRCIDS.store.store)
