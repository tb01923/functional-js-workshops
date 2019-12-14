const { reduceC: reduce } = require('./reduce')

const append = (xs, x) => xs.concat([x])

const arrayCopy = reduce(append, [])

module.exports = Object.freeze({
    append
    , arrayCopy
})
