const {curry} = require('../lesson-2-curry/curry')

// ::  [a] -> a
const head = xs => xs[0]

// :: [a] -> [a]
const tail = xs => xs.slice(1)

// :: ( ((a,b) -> a), a, [b] ) -> a
const reduce = (f, agg, xs) =>
    (xs.length == 0) ?
        agg :
        reduce(f, f(agg, head(xs)), tail(xs)) ;

const reduceImperative = (f, agg, xs) => {
    for(let i =0; i < xs.length; i++) {
        agg = f(agg, xs[i])
    }
    return agg
}


const reduceC = curry(reduce)

module.exports = Object.freeze({
    head,
    tail,
    reduce,
    reduceC
})
