const {empty, of, concat, equals} = require('fantasy-land');

const {head, curry} = require('./list-processing-helpers')
const {reduce} = require('./list-processing')

const simpleEquals = curry((a, b) =>
    a.getValue() === b.getValue()
)

const monoidTypeConstructor = curry(function(_concat, _emptyValue, _equals){

    const getInstance = (self, constructor) =>
        (self instanceof constructor) ?
            self :
            Object.create(constructor.prototype)


    function Monoid(value){

        const self = getInstance(this, Monoid)

        self[concat] = other =>
            Monoid[of](
                _concat(self.getValue(), other.getValue())
            )

        self.getValue = () =>
            value

        self[equals] = (other) =>
            Monoid[equals](self, other)

        return Object.freeze(self)
    }

    Monoid[of] = (x) =>
        Monoid(x);

    Monoid[empty] = () =>
        Monoid[of](_emptyValue);

    Monoid[equals] = _equals || simpleEquals

    return Object.freeze(Monoid)
})

const mempty = (a) =>
    a.constructor[empty]()

const mappend = (a, b) =>
    a[concat](b)

const mconcat = (xs) =>
    reduce(
        mappend,
        mempty(head(xs)),
        xs)

module.exports.monoidTypeConstructor = monoidTypeConstructor

module.exports.mempty = mempty
module.exports.mappend = mappend
module.exports.mconcat = mconcat