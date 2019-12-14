const {papply}  = require('./papply')


// :: (a, a) -> a
const add2 = (x1,x2) => x1 + x2

// ::
const curry = f =>
    (f.length == 0) ?
        f() :
        (...xs) => curry(xs.reduce(papply, f)) ;


module.exports = Object.freeze({
    add2,
    curry
})