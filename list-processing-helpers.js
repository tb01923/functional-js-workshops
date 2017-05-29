/////////////////////////////////////////////////////////////////////
// "javscript abstractions" functions
/////////////////////////////////////////////////////////////////////


const bind = (f, x) => f.bind(null, x)

// curry :: (a -> ...y -> z)
const curry = (f) =>
    (f.length != 0) ?
        (...xs) => curry(xs.reduce(bind, f)) :
        f()

// head :: [a] -> a
const head = (xs) => xs[0]

// tail :: [a] -> [a]
const tail = (xs) => xs.slice(1)

// append :: [a] -> a -> [a]
const append = curry((xs, x) =>
    xs.concat([x])
)


module.exports.head = head
module.exports.tail = tail
module.exports.append = append
module.exports.curry = curry