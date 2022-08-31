const {papply}  = require('./papply')


// :: (a, a) -> a
const add2 = (x1,x2) => x1 + x2

// ::
const curry = f =>
        (...xs) =>
            {
                if(xs.length >= f.length)
                    return f.apply(null, xs)

                return curry(xs.reduce(papply, f));
            }
}





/*
   const add4 = curry((a,b,c,d) => a+b+c+d)
   const todd = add4(1,2)
    xs: [1,2]
        initial: add4(a,b,c,d)
        1st: (add4(a,b,c,d), 1) -> add4(1,b,c,d)
        2nd: (add4(1,b,c,d), 2) -> add4(1,2,c,d)
    return: add4(1,2,c,d)

   const todd2 = todd(6,8)
    xs: [6,8]
        initial: add4(1,2,c,d)
        1st: (add4(1,2,c,d), 6) -> add4(1,2,6,d)
        2nd: (add4(1,2,6,d), 8) -> add4(1,2,6,8)
    return=> 17
*/

module.exports = Object.freeze({
    add2,
    curry
})