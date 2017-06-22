const {append, curry} = require('./list-processing-helpers')


//  ::  transf  -> reducer           -> results -> input
//  :: (b -> c) -> ((a, c)   -> a)   -> a       -> b        ->  a
const mapper = curry((f, agg, xs, x) =>
    agg(xs, f(x))
)

//  ::  predicate     -> reducer           -> results -> input
//  :: (a -> boolean) -> (([b], b) -> [b]) -> [b]     -> a
const filterer = curry((f, agg, xs, x) =>
    f(x) ? agg(xs, x)
         : xs
)

//  :: (results, input) -> results
//  :: ([b], b)         -> [b]
const appender = (xs, x) => append(xs, x)

module.exports.mapper = mapper
module.exports.appender = appender
module.exports.filterer = filterer