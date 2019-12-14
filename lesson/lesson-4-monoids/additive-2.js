// Immutable inner value and Object

// K combinator, a function that always returns a single (constant) value
const K = x => () => x

// Helper for Object Instantiation
const getInstance = (self, constructor) =>
    (self instanceof constructor) ?
        self :
        Object.create(constructor.prototype)


const Additive = function(v) {
    const self = getInstance(this, Additive) ;

    self.concat = (other) => {
        const c = self.extract() + other.extract()
        return Additive(c) ;
    }

    self.extract = K(v)

    return Object.freeze(self) ;
}
Additive.empty = () => Additive(0) ;

module.exports = Object.freeze({Additive})