const { Maybe, Just, nothing } = require('./maybe-functor')
const { JustType} = require('./maybe-functor-sanctuary-types')

const { create, env } = require('sanctuary');
const { map, compose } = create({ checkTypes: true, env: env.concat(JustType) });

const { extractFrom, isEqualTo } = require('./base-functors')
const double = x => x + x
const I = x => x


const isIdentity = eq => a =>
    eq(map(I, a), a)

const isComposition = eq => (a, f1, f2) =>
    eq(
        map(f2, map(f1, a)),
        map(compose(f1, f2), a)
    )

console.log(
    'Identity: Just(10)',
    isIdentity(isEqualTo)(Just(10))
)

console.log(
    'Identity: Nothing',
    isIdentity(isEqualTo)(nothing)
)

console.log(
    'Composition: Just(10)',
    isComposition(isEqualTo)(Just(10), double, double)
)

console.log(
    'Composition: Nothing',
    isComposition(isEqualTo)(nothing, double, double)
)
