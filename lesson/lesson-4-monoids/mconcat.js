const {empty, concat, equals} = require('fantasy-land');

const {reduce, head, tail} = require('../lesson-3-reduce-plus/reduce')

// Given an instance of a monoid, return an instance of empty
const mempty = a =>
a.constructor[empty]() ;

// generic concatenation across monoid - defer to implementation
const mappend = (a, b) =>
a[concat](b) ;

// reduce a list of a particular monoid
const mconcat = (xs) =>
reduce(
    mappend,
    mempty(head(xs)),
    xs) ;

module.exports = Object.freeze({
    mconcat
})
