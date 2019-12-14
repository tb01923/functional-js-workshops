const {head, tail, append, curry} = require('./list-processing-helpers')

/////////////////////////////////////////////////////////////////////
// "core functional library" functions
/////////////////////////////////////////////////////////////////////

// reduce :: ((a, b) -> a) -> a -> [b] -> a
const reduce = curry((f, agg, xs) => {
    console.log('reduce', agg, xs)
    const r = (xs.length) ?
        reduce(f, f(agg, head(xs)), tail(xs)) :
        agg

    return r
})
d
// appendingCombiner :: (a -> b) -> ([b], a) -> [b]
const appendingCombiner = f =>
    (agg, x) =>
        append(agg, f(x))

// map :: (a -> b) -> [a] -> [b]
const map = curry((f, xs) => {
    console.log('map', f.toString(), xs)
    return reduce(
        appendingCombiner(f)
        , []
        , xs)
})

// conditionalCombiner :: ((a -> bool) -> ([a], a) -> [a]
const conditionalCombiner = f =>
    (agg, x) =>
        (f(x)) ?
            append(agg, x) :
            agg

// filter :: (a -> bool) -> [a] -> [a]
const filter = curry((f, xs) => {
    console.log('filter', f.toString(), xs)
    return reduce(
        conditionalCombiner(f)
        , []
        , xs)
})

// pipe :: [(a -> b), (b -> c), ...(y -> z)] -> a -> z
const pipe = curry((xs, a) => {
    console.log('pipe', xs)
    return reduce(
        (g, f) => f(g)
        , a
        , xs)
}   )

// compose :: [(y -> z), ...(b -> c), (a -> b)] -> a -> z
const compose = (xs) => {
    console.log('compose', xs)
    return pipe(xs.reverse())
}

module.exports.reduce = reduce
module.exports.map = map
module.exports.filter = filter
module.exports.pipe = pipe
module.exports.compose = compose