const assert = require("assert")
const { curry } = require('./../list-processing-helpers')
const { pipe, reduce } = require('./../list-processing')
const { mapper, filterer, appender, summer, transduce } = require('./../list-processing-transducer-logging')


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

const arr1 = [1,2,3,4]
console.log("//=>", arr1)

console.log('---------------')
const arr2 = reduce(
    mapper(add(1), appender),
    [],
    arr1
)
console.log("//=>", arr2)

console.log('---------------')
const arr3 = reduce(
    filterer(isEven, appender),
    [],
    arr2
)
console.log("//=>", arr3)

console.log('---------------')

const add10AndFilter = pipe([
    mapper(add10),
    filterer(isEven)
])

const arr5 = reduce(
    add10AndFilter(appender),
    [],
    arr1
)
console.log("//=>", arr5)

console.log('---------------')
const appendingTransduce = transduce(appender)
const arr6 = appendingTransduce(
    add10AndFilter,
    [],
    arr1
)
console.log("//=>", arr6)

console.log('---------------')
const summingTransduce = transduce(summer)
const arr7 = summingTransduce(
    add10AndFilter,
    0,
    arr1
)
console.log("//=>", arr7)







process.exit(0)