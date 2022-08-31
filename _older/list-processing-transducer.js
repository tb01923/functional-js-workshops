const {append, curry} = require('./list-processing-helpers')


//  :: transformer  -> reducer          -> results -> input
//  :: (a -> b)     -> ((c, b) -> c)    -> c       -> a     -> c
const mapper = curry((f, agg, xs, x) =>
    agg(xs, f(x))
)

//  :: predicate      -> reducer           -> results -> input
//  :: (a -> boolean) -> (([a], a) -> [a]) -> [a]     -> a      -> [a]
const filterer = curry((f, agg, xs, x) =>
    f(x) ? agg(xs, x)
         : xs
)

//  :: (results, input) -> results
//  :: ([b], b)         -> [b]
const appender = (xs, x) => append(xs, x)

//  :: (results, input) -> results
//  :: (b, b)           -> b
const summer = (a, b) => a + b

//  :: Aggregator       -> chain (e.g. mapper w/ transform applied)     -> initial  -> input
//  :: ((b, a) -> b)    -> [((c, b) -> c) -> c -> a -> c]   -> b        -> [a]      -> c
const transduce = curry((aggregator, chain, initial, input) =>
    reduce(
        chain(aggregator),
        initial,
        input
    )
)

module.exports.mapper = mapper
module.exports.filterer = filterer
module.exports.appender = appender
module.exports.summer = summer
module.exports.transduce = transduce