// Fantasy Land compliant, with Type Construction

// 1. a.concat(b).concat(c) is equivalent to a.concat(b.concat(c)) (associativity)
// 2. a.concat(M.empty()) is equivalent to a (right identity)
// 3. M.empty().concat(a) is equivalent to a (left identity)

const {empty, of, concat, extract} = require('fantasy-land');

// K combinator, a function that always returns a single (constant) value
const K = x => () => x

const getInstance = (self, constructor) =>
    (self instanceof constructor) ?
        self :
        Object.create(constructor.prototype) ;

const monoidTypeConstructor = function(concatF, emptyValue){

    function Monoid(v){

        const self = getInstance(this, Monoid)

        self[extract] = K(v)

        self[concat] = other =>
            Monoid[of](
                concatF(self[extract](), other[extract]())
            )

        return Object.freeze(self)
    }

    Monoid[of] = Monoid ;

    Monoid[empty] = K(
        Monoid[of](emptyValue)
    );

    return Object.freeze(Monoid)
}

module.exports = Object.freeze({
    monoidTypeConstructor
})