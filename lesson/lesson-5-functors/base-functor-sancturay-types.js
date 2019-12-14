const $ = require('sanctuary-def');
const type = require('sanctuary-type-identifiers');
const Z = require('sanctuary-type-classes') ;

const uncurry4 = f => (a,b,c,d,e) => f(a)(b)(c)(d)(e)
const unaryType = uncurry4($.UnaryType)

const { Identity, Const, extractFrom } = require('./base-functors.js')

Identity['@@type'] = 'fs-javascript/Identity' ;
const isIdentity = x => type (x) === Identity['@@type']



const IdentityType = unaryType(
    Identity['@@type'],
    'http://example.com/fs-javascript#Identity',
    isIdentity,
    x => [extractFrom(x)],
    $.Unknown
)

Const['@@type'] = 'fs-javascript/Const' ;
const isConst = x => type (x) === Const['@@type']

const ConstType = unaryType(
    Const['@@type'],
    'http://example.com/fs-javascript#Const',
    isConst,
    x => [extractFrom(x)],
    $.Unknown
)

module.exports =Object.freeze({
    IdentityType,
    ConstType
})