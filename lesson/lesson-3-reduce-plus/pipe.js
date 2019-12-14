const { reduceC: reduce } = require('./reduce')

// Identity combinator
const I = x => x ;

// :: ((a -> b), (b -> c)) -> a -> c
const leftToRightComposition = (f, g) => x => g(f(x))

// :: ((b -> c), (a -> b)) -> a -> c
const rightToLeftComposition = (f, g) => x => f(g(x))

// :: [(a -> b), (b -> c)...(y -> z)] -> (a -> z)
const pipe = reduce(leftToRightComposition, I)

// :: [(y -> z)...(b -> c), (a -> b)] -> a -> z
const compose = reduce(rightToLeftComposition, I)

const pipe2 = leftToRightComposition

module.exports = Object.freeze({
    leftToRightComposition
    , rightToLeftComposition
    , pipe
    , pipe2
    , compose
})
