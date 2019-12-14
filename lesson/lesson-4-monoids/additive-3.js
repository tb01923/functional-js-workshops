// Fantasy Land compliant
const {empty, concat, extract} = require('fantasy-land');
const {curry} = require('../lesson-2-curry/curry');

// K combinator, a function that always returns a single (constant) value
const K = x => _ => x

// Helper for Object Instantiation
const getInstance = (self, constructor) =>
    (self instanceof constructor) ?
        self :
        Object.create(constructor.prototype)


const Additive = function(v) {
    const self = getInstance(this, Additive) ;

    self[concat] = (other) => {
        const c = self[extract]() + other[extract]();
        return Additive(c) ;
    }

    self[extract] = K(v)

    return Object.freeze(self) ;
}

Additive[empty] = K(Additive(0)) ;

module.exports = Object.freeze({Additive})