const {pipe} = require('../../util/sanctuary-config.js')

const double = x => x * 2 ;
const square = x => x ** 2 ;

const doubleAndSquare = pipe([
    double,
    square
])

const squareAndDouble = pipe([
    square,
    double
])

module.exports = Object.freeze({
    double,
    square,
    doubleAndSquare,
    squareAndDouble
})