// Thanks to karma-chai-plugins, those libs are exposed as global variables for convenience
// over typing several lines of boilerplate code at the beginning of each test.
// Also declare them into typescript.
// NOTE: using those globals is optional, a require() (+boilerplate) still work and will even give correct typings.
declare const describe: (t: string, f: Function) => void
declare const context: any
declare const beforeEach: any
declare const afterEach: any
declare const before: any
declare const after: any
declare const it: any
declare const expect: any
//declare const sinon: any
