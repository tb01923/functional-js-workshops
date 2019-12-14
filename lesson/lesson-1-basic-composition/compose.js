const {compose} = require('../../util/sanctuary-config.js')

const double = x => x * 2 ;
const square = x => x ** 2 ;

const doubleAndSquare = compose(
    square,
    double
)

const squareAndDouble  = compose(
    double,
    square
)

module.exports = Object.freeze({
    double,
    square,
    doubleAndSquare,
    squareAndDouble
})

