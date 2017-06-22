const assert = require("assert")
const {curry} = require('./../list-processing-helpers')
const {reduce, map, filter, compose, pipe} = require('./../list-processing-logging')


/////////////////////////////////////////////////////////////////////
// "logic" functions
/////////////////////////////////////////////////////////////////////

// mult :: a -> a -> a
const mult = curry((a, b) => a * b)
// add :: a -> a -> a
const add = curry((a, b) => a + b)

// add10 :: a -> a
const add10 = add(10)
assert.deepEqual(add10(10), 20)

// isEven :: number -> bool
const isEven = (x) => x % 2 == 0

assert.deepEqual( reduce(add, 0, [1,2,3,4]),     10 )
assert.deepEqual( map(mult(2), [1,2,3,4]),       [2,4,6,8] )
assert.deepEqual( filter(isEven, [1,2,3,4]),     [2,4] )
assert.deepEqual( pipe([add(3), mult(2)])(2),    10 )
assert.deepEqual( compose([add(3), mult(2)])(2), 7 )


process.exit(0)