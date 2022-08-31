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

const loop = (f, iterationsRemaining) => {
    // if there is nothing left -> exit
    if(iterationsRemaining == 0)
        return

    // doSomething by invoke f
    f()

    // iterate 1 less time
    loop(f, iterationsRemaining - 1)
}

// ::  [a] -> a
const head = xs => xs[0]

// :: [a] -> [a]
const tail = xs => xs.slice(1)

const isEmpty = array => array.length == 0

const reduceR = (f, agg, array) =>
{
    // if there is nothing left -> exit
    if(isEmpty(array)) {
        return agg
    }

    // doSomething by invoke f
    agg = f(agg, head(array))

    // iterate 1 less w/ item (throw the head {the 0th element} away)
    return reduce(f, agg, tail(array));
}

const reduceImperative = (f, agg, xs) => {
    for(let i =xs.length - 1; i > 0; i--) {
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
