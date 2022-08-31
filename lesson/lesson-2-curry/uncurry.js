

// :: (a, a) -> a
const add2 = (x1) => (x2) => x1 + x2
add2(1)(2)

// add2Better = uncurry(add2)
// add2Better(1,2)

// :: (a -> b -> c) -> (a, b) -> c
const uncurry = f => (x1, x2) => f(x1)(x2)

module.exports = Object.freeze({
    add2,
    uncurry
})