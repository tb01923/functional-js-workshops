//const { prismPath, view } = require('ramda') ;
// const { curry } = require('../lesson-2-curry/curry') ;
// const curry2 = curry
// const curry3 = curry
// const { pipe } = require('../lesson-3-reduce-plus/pipe') ;
// const { map } = require('../lesson-3-reduce-plus/map') ;

const { pipe, map, chain, curry2, curry3, toMaybe, reduce } = require('sanctuary')

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  General helpers not necessarily limited to Prism/lenses
//////////////////////////////////////////////////////////////////////////////////////////////////////

// get everything but the last item in an array
const init = arr => arr.slice(0, -1)
const last = arr => arr[arr.length - 1]

const pluck = k => map(o => o[k])

const clone = pipe([
    JSON.stringify,
    JSON.parse
])

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  Object accessor and setters
//////////////////////////////////////////////////////////////////////////////////////////////////////

// :: a { String: b } => String -> a -> Maybe b
const maybeProp = curry2((k, o) =>  toMaybe( o[k] ));

// :: a { String: b } => String -> b -> a -> a
const maybeAssoc = curry3((k, v, o) => {
    o[k] = v ;
    return toMaybe(o)
} );

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  Prism Constructors
//////////////////////////////////////////////////////////////////////////////////////////////////////

// Prism :: ((String -> a -> b), (String -> b -> a -> a)) -> Prism
const Prism = (label, getter, setter) => Object.freeze({
    label,
    getter,
    setter
})

// :: String -> Prism
const prismProp = k => Prism(k, maybeProp(k), maybeAssoc(k))

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  Prism Operators
//////////////////////////////////////////////////////////////////////////////////////////////////////

// :: a { String: b } => Prism -> a -> b
const view = prism =>
    pipe([toMaybe, chain(prism.getter)])

// :: a { String: b } => Prism -> b -> a -> a
const set = curry3((prism, value, object) => pipe([
    clone,
    toMaybe,
    chain(prism.setter(value))
])(object))


// :: Prism -> (a -> b) -> a -> b
const over = curry3((prism, f, object) => {
    const c = clone(object)
    const m = toMaybe(c)
    const o = chain(prism.getter, m)
    const d = map(f, o)
    const r = chain(prism.setter(d.value), m)
    return m
})

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  pipePrism Combinator
//////////////////////////////////////////////////////////////////////////////////////////////////////

const joinWith = x => arr => arr.join(x)

const reduceLabels = pipe([
    pluck('label'),
    joinWith(':')
])

const pushSafe = x => arr => [x].concat(arr)
const reduceGetters = pipe([
    pluck('getter'),            // get the getters
    map(chain),                 // wrap each getter in chain
    pushSafe(toMaybe),          // start chain by converting input to Maybe
    pipe                        // create a piped function using all funcitons in input array
])

const orDefault = defaultValue => maybe =>
    maybe.isJust ? maybe.value : defaultValue

const orObject = pipe([
    orDefault({}),
    clone
])

const reduceSetters = xs => curry2((v, o) => {
    const reducePrismArray = currentObject => currentPrism =>
        currentPrism.getter(
            currentPrism.setter(
                orObject(
                    currentPrism.getter(currentObject)
                )
                , currentObject
            ).value
        ).value ;


    let currentObject = reduce(
        reducePrismArray,
        o,
        init(xs)
    )

    const currentPrism = last(xs)
    const _ = currentPrism.getter(
        currentPrism.setter(
            orObject(
                toMaybe(v)
            )
            , currentObject
        ).value
    ).value ;


    // return new instance of the outer object, with inner mutation
    return toMaybe(o)
})

const pipePrism = xs => Prism(
    reduceLabels(xs),
    reduceGetters(xs),
    reduceSetters(xs)
)

//////////////////////////////////////////////////////////////////////////////////////////////////////
//  ADD ON HELPERS
//////////////////////////////////////////////////////////////////////////////////////////////////////

const pipe2 = pipeline => curry2((a, b) =>
    (pipe(pipeline)(a))(b)
)

// :: [String] -> Lens
const prismPath = pipe([
    map(prismProp),
    pipePrism
])

// :: [String] -> Maybe a
const viewPath = pipe2([
    prismPath,
    view
])


// :: a -> [String] -> Maybe a -> a
const viewPathWithDefault = defaultValue => (a,b) => orDefault(
    defaultValue,
    pipe2([
        prismPath,
        view
    ])(a,b)
)

////////////////////////////////////////////////////////////////////////////////////
// TEST  Setup
////////////////////////////////////////////////////////////////////////////////////

// inidvidual prisms
const wPrism = prismProp("w") ;
const yPrism = prismProp("y") ;
const xPrism = prismProp("x") ;
const zPrism = prismProp("z") ;
const zzPrism = prismProp("zz") ;

const viewW = view(wPrism)
const setW = set(wPrism)

// a composed prism
const wxyPrism = pipePrism([wPrism, xPrism, yPrism ]);
const viewWXY = view(wxyPrism)
const setWXY = set(wxyPrism)
const overWXY = over(wxyPrism)

// another composed prism
const wxzPrism = prismPath(['w','x','z'])
const viewWXZ = view(wxzPrism)
const setWXZ = set(wxzPrism)

////////////////////////////////////////////////////////////////////////////////////
// TESTs themselves
////////////////////////////////////////////////////////////////////////////////////

const object = {
    a: { x:  {y: 2, z: 3} }
} ;

// Individual prism
//---------------------------------------------------------
console.log('viewW', wPrism.label, viewW(object))
const result2 = setW("cheetos", object)
console.log('setW', result2)

// Composed Prism option 1
////---------------------------------------------------------
console.log('viewWXY', wxyPrism.label, viewWXY(object))
const result3 = setWXY("cheetos", object)
console.log('setWXY', result3)

// Composed Prism option 2
//---------------------------------------------------------
console.log('viewWXZ', wxzPrism.label, viewWXZ(object))
const result4 = setWXZ("cheetos", object)
console.log('setWXZ', result4)

// Composing prisms and viewing in a single step, 2 options
//---------------------------------------------------------
console.log('viewPath WX', viewPath(['w','x'], object))
console.log('viewPathWithDefault(default ed)', viewPathWithDefault('ed')(['w','x'], object))

console.log('original', object)