
const {map: fantastyMap, extract } = require('fantasy-land');
const {curry} = require('../lesson-2-curry/curry')
const {pipe, pipe2} = require('../lesson-3-reduce-plus/pipe')
const {Maybe} = require('../lesson-5-functors/maybe-functor')
const {Identity, Const} = require('../lesson-5-functors/base-functors')

// combinators
const I = x => x
const K = x => _ => x

// helpers
const extractFrom = x => x[extract]()
const mapOver = f => x => x[fantastyMap](f)

const copy = obj => {
    const result = {};
    for (var p in obj) {
        result[p] = obj[p];
    }
    return result
}

// Natural Transformation between any Functor F(x | null | undefined) and Maybe
// :: F -> Maybe
const maybeFromNillableConst = pipe2(
    extractFrom,
    Maybe.fromNillable
)


////////////////////////////////////////////////////////////////////////////////
// Lenses
////////////////////////////////////////////////////////////////////////////////
const prop = curry( (k, x) => x[k] );

// :: String, Object, Object -> Object
const assoc = curry( (k, v, x) => {
    const result = copy(x) ;
    result[k] = v ;
    return result
} );

const Lens = (getter, setter) =>
    F =>
        x => (pipe([
            getter,
            F,
            mapOver(y => setter(y, x))
        ])(x))

// :: String s, Functor f => s -> (a -> f a) -> {s : a}
const lensProp = curry(k => Lens(
    prop(k),
    assoc(k)
))

////////////////////////////////////////////////////////////////////////////////
// over
////////////////////////////////////////////////////////////////////////////////
const overWith = (F, extractor) => (lens, f, x) => {
    const toF = x =>
        mapOver(f)(F(x))

    const applyLensThenExtract = pipe2(
        lens(toF),
        extractor
    )

    return applyLensThenExtract(x)
}

const over = overWith(Identity, extractFrom)
const overPartial = overWith(Maybe.fromNillable, extractFrom)

////////////////////////////////////////////////////////////////////////////////
// view
////////////////////////////////////////////////////////////////////////////////
const viewWith = extractor => curry((lens, x) => {
    const applyLensThenExtract = pipe2(
        lens(Const),
        extractor
    )

    return applyLensThenExtract(x)
})

const view = viewWith(extractFrom)
const viewPartial = viewWith(maybeFromNillableConst)


////////////////////////////////////////////////////////////////////////////////
// set (think of it as over, but insted of transforming the value thats there the transforming function is constant
////////////////////////////////////////////////////////////////////////////////
const set = (lens, v, x) => over(lens, K(v), x)

const xyObj = {x:10, y: 11}
const double = x => x + x
const xLens = lensProp('x')
const zLens = lensProp('z')

console.log('view1', view(xLens, xyObj))
console.log('over', over(xLens, double, xyObj))
console.log('overPartial', overPartial(xLens, double, xyObj))
console.log('view2', view(xLens, xyObj))
console.log('set', set(xLens, 99, xyObj))
console.log('view3', view(xLens, xyObj))

const maybeX = viewPartial(xLens, xyObj)
console.log('viewPartial', maybeX.isJust, extractFrom(maybeX))