
// :: (a, a) -> a
const add2 = (x1,x2) => x1 + x2

// :: ((a,b...c) -> z) -> a -> ((b...c) -> z)
const papply = (f, x) => f.bind(null, x)

// :: Number -> Number
const increment = papply(add2, 1)

module.exports = Object.freeze({
    increment,
    add2,
    papply
})