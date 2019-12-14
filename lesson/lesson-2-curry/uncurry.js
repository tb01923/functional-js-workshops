

// :: (a, a) -> a
const add2 = (x1,x2) => x1 + x2

// :: (a -> b -> c) -> (a, b) -> c
const uncurry = f => (x1, x2) => f(x1,x2)

module.exports = Object.freeze({
    add2,
    uncurry
})