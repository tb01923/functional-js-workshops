//const { lensPath, view } = require('ramda') ;
const { curry } = require('../lesson-2-curry/curry') ;
const { pipe } = require('../lesson-3-reduce-plus/pipe') ;
const { map } = require('../lesson-3-reduce-plus/map') ;
const { reduceC: reduce } = require('../lesson-3-reduce-plus/reduce') ;

const S = require('sanctuary')

const clone = pipe([
    JSON.stringify,
    JSON.parse
])

// :: a { String: b } => String -> a -> b
const prop = curry((k, o) =>  S.toMaybe( o[k] ));

// :: a { String: b } => String -> b -> a -> a
const assoc = curry((k, v, o) => {
    o[k] = v ;
    return S.toMaybe(o)
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
const view = lens =>
    pipe([S.toMaybe, S.chain(lens.getter)])

// :: a { String: b } => Lens -> b -> a -> a
const set = curry((lens, value, object) => pipe([
    clone,
    S.toMaybe,
    S.chain(lens.setter(value))
])(object))


const compose3 = (a,b,c) => Lens(
    a.label + ":" + b.label + ":" + c.label,
    pipe([S.toMaybe, S.chain(a.getter), S.chain(b.getter), S.chain(c.getter)]),
    curry((v, o) => {
        const r = pipe([S.toMaybe, S.chain(a.getter), S.chain(b.getter), S.chain(c.setter(v))])(o)
        return S.toMaybe(o)
    })
)

////////////////////////////////////////////////////////////////////////////////////
// TESTS
const wLens = lensProp("w") ;
const yLens = lensProp("y") ;
const xLens = lensProp("x") ;
const zLens = lensProp("z") ;

const viewW = view(wLens)
const setW = set(wLens)

const wxyLens = compose3(wLens, xLens, yLens);
const viewWXY = view(wxyLens)
const setWXY = set(wxyLens)

const object = {
    w: { t:  {y: 2, z: 3} }
} ;

// console.log('------------------------------')
console.log('viewW', wLens.label, viewW(object))
const result2 = setW("cheetos", object)
console.log('setW', result2)

console.log('viewWXY', wxyLens.label, viewWXY(object))
const result3 = setWXY("cheetos", object)
console.log('setWXY', result3)
console.log('original', object)