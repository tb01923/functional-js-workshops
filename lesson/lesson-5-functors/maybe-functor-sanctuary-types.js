const $ = require('sanctuary-def');
const type = require('sanctuary-type-identifiers');
const Z = require('sanctuary-type-classes') ;

const { extractFrom } = require('./base-functors')
const { Just } = require('./maybe-functor')


const uncurry4 = f => (a,b,c,d,e) => f(a)(b)(c)(d)(e)
const unaryType = uncurry4($.UnaryType)

Just['@@type'] = 'fs-javascript/Just' ;
const isJust = x => type (x) === Just['@@type']


const JustType = unaryType(
    Just['@@type'],
    'http://example.com/fs-javascript#Just',
    isJust,
    x => [extractFrom(x)],
    $.Unknown
)

module.exports = Object.freeze({
    JustType
})