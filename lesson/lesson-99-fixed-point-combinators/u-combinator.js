const { curry } = require('../lesson-2-curry/curry')

// U combinator - self application (applies a funciton to itself)
// λg.(g g)
const U = g => g(g) ;

// sum up to a number, using U combinator, manually curried unary functions
//  1. self reference function (to iterate)
//  2. the value to the next iteration
const u_sum = U(
    // iterator
    iterator => {
        // function to iterate
        return x => {
            if(x === 0) {
                // halt
                return x
            } else {
                // setup iteration
                const nextApplied = iterator(iterator)
                // iterate
                return x + nextApplied(x-1)
            }
        }
    }
)

// sum up to a number, using U combinator, systematically curried unary functions
//  1. self reference function (to iterate)
//  2. the value to the next iteration
const u_sum2 = U(
    curry((iterator, x) =>
        (x === 0) ?
            x :
            x + iterator(iterator, x-1)
    )
)

// magic U combinator that curries the function being passed in
const U_curry = f => U(curry(f))

// sum up to a number, using U_curry combinator
//  1. self reference function (to iterate)
//  2. the value to the next iteration
const u_sum3 = U_curry((iterator, x) =>
    (x === 0) ?
        x :
        x + iterator(iterator, x-1)
)


// sum up to a number, using U_curry combinator, and the U Combinator to self apply the next iteration
//  1. self reference function (to iterate)
//  2. the value to the next iteration
const u_sum4 = U_curry((iterator, x) =>
    (x === 0) ?
        x :
        x + U(iterator)(x-1)
)

// u_sum cleaned up
const u_sum5 = U(
    iterator =>
        x =>
            (x === 0) ?
                x :
                x + iterator(iterator)(x-1)
)






const s10 = u_sum(10)
const _s10 = u_sum2(10)
const __s10 = u_sum3(10)
const ___s10 = u_sum4(10)
const ____s10 = u_sum5(10)

console.log()