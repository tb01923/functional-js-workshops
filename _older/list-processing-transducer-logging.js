const { reduce } = require('./list-processing-logging')
const {append, curry} = require('./list-processing-helpers')

const mapper = curry((f, agg, xs, x) => {
    console.log('mapper', xs, x)
    const r = agg(xs, f(x))
    console.log('\tmapper', '->', r)
    return r
})

const filterer = curry((f, agg, xs, x) => {
    console.log('filterer', xs, x)
    const r = f(x) ? agg(xs, x)
         : xs
    console.log('\tfilterer','->', r)
    return r
})


const appender = (xs, x) => {
    const r = append(xs, x)
    console.log('appender', xs, x, '->', r)
    return r
}

const summer = (a, b) => {
    console.log('summer', a, b)
    return a + b
}

const transduce = curry((aggregator, chain, initial, input) =>{
    console.log('transduce', aggregator.name, initial, input)

    const r = reduce(
        chain(aggregator),
        initial,
        input
    )

    return r
})

module.exports.mapper = mapper
module.exports.appender = appender
module.exports.filterer = filterer
module.exports.transduce = transduce
module.exports.summer = summer