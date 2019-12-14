const { reduceC: reduce, head } = require('.//reduce')


// Helper for Object Instantiation
const getInstance = (self, constructor) =>
    (self instanceof constructor) ?
        self :
        Object.create(constructor.prototype)

///////////////////////////////////////////////////////////////////////////////////////
// This is the monoid
///////////////////////////////////////////////////////////////////////////////////////
const Additive = function(v) {
    const self = getInstance(this, Additive) ;

    self.concat = (other) => {
        const c = self.getValue() + other.getValue()
        return Additive(c) ;
    }

    self.getValue = () => v

    self.toString = () => "Additive(" + v + ")" ;

    return Object.freeze(self) ;
}
Additive.empty = () => Additive(0) ;

///////////////////////////////////////////////////////////////////////////////////////
// Reduce in force
///////////////////////////////////////////////////////////////////////////////////////
// Given an instance of a monoid, return an instance of empty
const mempty = a =>
    a.constructor.empty() ;

// generic concatenation across monoid - defer to implementation
const mappend = (a, b) =>
    a.concat(b) ;

// reduce a list of a particular monoid
const mconcat = (xs) =>
    reduce(
        mappend,
        mempty(head(xs)),
        xs) ;

module.exports = Object.freeze({
    Additive,
    mconcat
})


///////////////////////////////////////////////////////////////////////////////////////
// Here is the test
///////////////////////////////////////////////////////////////////////////////////////
// const logObject = o => console.log(o.toString()) ;
// logObject(
//     mconcat([
//         Additive(2),
//         Additive(3),
//         Additive(0)
//     ])
// ) ;
//=> Additive(5)