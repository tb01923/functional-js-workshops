const { reduce } = require('./list-processing')
const {append, curry} = require('./list-processing-helpers')

const mapper = curry((f, agg, xs, x) => {
    console.log('mapper', xs, x)
    return agg(xs, f(x))
})

const filterer = curry((f, agg, xs, x) => {
    console.log('filterer', xs, x)
    return f(x) ? agg(xs, x)
         : xs
})


const appender = (xs, x) => {
    console.log('appender', xs, x)
    return append(xs, x)
}

const summer = (a, b) => {
    console.log('summer', a, b)
    return a + b
}

const transduce = curry((aggregator, chain, inital, input) =>
    reduce(
        chain(aggregator),
        inital,
        input
    )
)

module.exports.mapper = mapper
module.exports.appender = appender
module.exports.filterer = filterer
module.exports.transduce = transduce
module.exports.summer = summer