const { reduceC: reduce } = require('./reduce')
const { append } = require('./array-copy')

// :: (a -> b) -> ([b], a) -> [b]
const transformingAppender = f =>
    (agg, x) =>
        append(agg, f(x))



// :: (a -> b) -> [a] -> [b]
const map = f => reduce(transformingAppender(f), [])

module.exports = Object.freeze({
    transformingAppender
    , map
})
