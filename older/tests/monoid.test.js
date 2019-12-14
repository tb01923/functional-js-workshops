const assert = require("assert")

// function names
const { equals } = require('fantasy-land');

// algebras / laws
const { leftIdentity, rightIdentity } = require('fantasy-land/laws/monoid');
const { associativity } = require('fantasy-land/laws/semigroup');
const { reflexivity, symmetry, transitivity } = require('fantasy-land/laws/setoid');

const setoidLaws = [
    reflexivity,
    symmetry,
    transitivity
]

const semiGroupLaws = setoidLaws.concat([
    associativity
])

const monoidLaws = semiGroupLaws.concat([
    leftIdentity,
    rightIdentity
])

// monoid library
const { reduce } = require('./../list-processing')

const { monoidTypeConstructor, mconcat } = require('./../monoid')

// smart eq, object supports fl-equals use it, otherwise leverage js equality
const eq = (a,b) =>
    (a[equals]) ?
        a[equals](b) :
        a === b

const checkLaw = (T, value) => (agg, law) =>
    agg && law(T)(eq)(value)

const checkLaws = (laws, T, value) =>
    reduce(
        checkLaw(T, value),
        true,
        laws)

const add = (a, b) => a + b
const Additive = monoidTypeConstructor(add, 0)

const mult = (a, b) => a * b
const Multiplicative = monoidTypeConstructor(mult, 1)

const and = (a, b) => a && b
const All = monoidTypeConstructor(and, true)

const or = (a, b) => a || b
const Any = monoidTypeConstructor(or, false)

const concatenate = (a, b) => a + b
const String = monoidTypeConstructor(concatenate, "")

assert.equal(checkLaws(monoidLaws, Multiplicative, 20), true)
assert.equal(checkLaws(monoidLaws, Additive, 10), true)
assert.equal(checkLaws(monoidLaws, All, true), true)
assert.equal(checkLaws(monoidLaws, Any, true), true)
assert.equal(checkLaws(monoidLaws, String, "a"), true)


assert.equal(mconcat([Additive(2), Additive(3)])[equals](Additive(5)), true)
assert.equal(mconcat([Multiplicative(2), Multiplicative(2), Multiplicative(2)])[equals](Multiplicative(8)), true)

process.exit(0)