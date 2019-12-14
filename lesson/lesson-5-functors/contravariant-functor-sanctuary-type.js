const $ = require('sanctuary-def');
const type = require('sanctuary-type-identifiers');
const Z = require('sanctuary-type-classes') ;

const { extractFrom } = require('./base-functors')
const { Contra } = require('./contravariant-functor')


const uncurry4 = f => (a,b,c,d,e) => f(a)(b)(c)(d)(e)
const unaryType = uncurry4($.UnaryType)

Contra['@@type'] = 'fs-javascript/Contra' ;
const isContra = x => type (x) === Contra['@@type']


const ContraType = unaryType(
    Contra['@@type'],
    'http://example.com/fs-javascript#Contra',
    isContra,
    x => [extractFrom(x)],
    $.Unknown
)

module.exports = Object.freeze({
    ContraType
})