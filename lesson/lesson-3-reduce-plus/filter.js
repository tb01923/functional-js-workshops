const { reduceC: reduce } = require('./reduce')
const { append } = require('./array-copy')

// :: (a -> Boolean) -> ([a], a) -> [a]
const conditionalAppender = f =>
    (agg, x) =>
        f(x) ?
            append(agg, x) :
            agg

// :: (a -> Boolean) -> [a] -> [a]
const filter = f => reduce(conditionalAppender(f), [])

module.exports = Object.freeze({
    conditionalAppender
    , filter
})
