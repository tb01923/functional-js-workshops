//const { lensPath, view } = require('ramda') ;
const { curry } = require('../lesson-2-curry/curry') ;
const { pipe } = require('../lesson-3-reduce-plus/pipe') ;
const { map } = require('../lesson-3-reduce-plus/map') ;
const { reduceC: reduce } = require('../lesson-3-reduce-plus/reduce') ;

// get everything but the last item in an array
const init = arr => arr.slice(0, -1)
const last = arr => arr[arr.length - 1]

const clone = pipe([
    JSON.stringify,
    JSON.parse
])

// :: a { String: b } => String -> a -> b
const prop = curry( (k, o) => o[k] );

// :: a { String: b } => String -> b -> a -> a
const assoc = curry( (k, v, o) => {
    o[k] = v ; return o
} );

const pluck = k => map(prop(k))


// Lens :: ((String -> a -> b), (String -> b -> a -> a)) -> Lens
const Lens = (label, getter, setter) => Object.freeze({
    label,
    getter,
    setter
})

// :: String -> Lens
const lensProp = k => Lens(k, prop(k), assoc(k))

// :: a { String: b } => Lens -> a -> b
const view = curry((lens, object) =>
    lens.getter(object)) ;

// :: a { String: b } => Lens -> b -> a -> a
const set = curry((lens, value, object) => pipe([
    clone,
    lens.setter(value)
])(object))


const concatWith = x => (a,b) => a + x + b
const combineWithColonSeparator = reduce(concatWith(":"), '')
const reduceLabels = pipe([pluck('label'), combineWithColonSeparator])
const reduceGetters = pipe([pluck('getter'), pipe])
const reduceSetters = xs => curry((v, o) => {
    // gather all but the last lenses, they are the read path
    const getters = reduceGetters(init(xs))
    // take the last lense that is the write path, from the tail of the read path
    const setter = prop('setter', last(xs))

    // create new instance of the inner object, mutate
    const _ = pipe([getters, setter(v)])(o)

    // return new instance of the outer object, with inner mutation
    return o
})

const pipeLens = xs => Lens(
    reduceLabels(xs),
    reduceGetters(xs),
    reduceSetters(xs)
)

// const over = curry((lens, f, object) =>
//     f(lens.getter(object)))


////////////////////////////////////////////////////////////////////////////////////
// TESTS

const wLens = lensProp("w") ;
const xLens = lensProp("x") ;
const yLens = lensProp("y") ;
const zLens = lensProp("z") ;

const viewX = view(xLens)
const setX = set(xLens)


//const wxLens = pipeLens(wLens, xLens)


const variableLens = pipeLens([wLens, xLens, zLens])


const viewVar = view(variableLens)
const setVar = set(variableLens)

const object = {
    w: { x:  {y: 2, z: 3} }
} ;

// console.log('o', object)
// console.log('x-o', viewX(object))
// const result = setX("fruit flies",object)
// console.log('r', result)
// console.log('x-o', viewX(object))
// console.log('x-r', viewX(result))
// console.log('o', object)

// console.log('------------------------------')
console.log('xw-o', variableLens.label, viewVar(object))
const result2 = setVar("cheetos", object)
console.log('o', object)
console.log('r2', result2)