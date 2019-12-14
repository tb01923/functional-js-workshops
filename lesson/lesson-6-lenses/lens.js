//const { lensPath, view } = require('ramda') ;
const { curry } = require('../lesson-2-curry/curry') ;
const { pipe } = require('../lesson-3-reduce-plus/pipe') ;
const { map } = require('../lesson-3-reduce-plus/map') ;
const { reduceC: reduce } = require('../lesson-3-reduce-plus/reduce') ;

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


////////////////////////////////////////////////////////////////////////////////////
// TESTS

const wLens = lensProp("w") ;

const viewW = view(wLens)
const setW = set(wLens)



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
console.log('w-o', wLens.label, viewW(object))
const result2 = setW("cheetos", object)
console.log('o', object)
console.log('r2', result2)