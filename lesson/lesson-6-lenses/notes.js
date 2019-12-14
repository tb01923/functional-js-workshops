///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// lens_pipe.js
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// :: (String, String) -> String
const reduceLabel2 = (l1, l2) => l1 + '::'+ l2
// :: ((a -> b), (b -> c)) -> a -> c
const reduceGetter2 = (g1, g2) => pipe([g1, g2])
// :: ((a -> b), ( b -> b)) -> a
const reduceSetter2 = (g1, s1) => curry((v, o) => {
    (pipe([g1, s1(v)]))(o)
    return o
})

// :: (Lens, Lens) -> Lens
const pipeLens2 = (l1, l2) => Lens(
    reduceLabel2(l1.label, l2.label),
    reduceGetter2(l1.getter, l2.getter),
    reduceSetter2(l1.getter, l2.setter)
)


// prism_pipe.js
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// const compose3 = (a,b,c) => Prism(
//     a.label + ":" + b.label + ":" + c.label,
//     pipe([S.toMaybe, S.chain(a.getter), S.chain(b.getter), S.chain(c.getter)]),
//     curry((v, o) => {
//         const r = pipe([S.toMaybe, S.chain(a.getter), S.chain(b.getter), S.chain(c.setter(v))])(o)
//         return S.toMaybe(o)
//     })
// )
// const wxyPrism = compose3(wPrism, xPrism, yPrism);



const reduceSetters = xs => curry2((v, o) => {
    // // gather all but the last prismes, they are the read path
    // const getters = reduceGetters(init(xs))
    //
    // // take the last prism that is the write path, from the tail of the read path
    // const chainedSetter = chain(last(xs).setter(v))
    //
    // // create new instance of the inner object, mutate
    // const _ = pipe([getters, chainedSetter])(o)

    // let currentObj = o ;
    // let initialPrisms = init(xs)
    //
    // for(let currentPrism in initialPrisms){
    //     let t = 10
    //     currentObj =
    //         currentPrism.getter(
    //             currentPrism.setter(
    //                 orObject(
    //                     currentPrism.getter(currentObj)
    //                 )
    //                 , currentObj
    //             ).value
    //         ).value ;
    // }

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
    currentPrism.getter(
        currentPrism.setter(
            orObject(
                toMaybe(v)
            )
            , currentObject
        ).value
    ).value ;


    // // x
    // const lens1 = xs[1]
    // const add1 = orObject(lens1.getter(v0))
    // const set1 = lens1.setter(add1, v0)
    // const v1 = lens1.getter(v0).value ;
    //
    // // y
    // const lens2 = xs[2]
    // const add2 = orObject(lens2.getter(v1))
    // const set2 = lens2.setter(add2, v1)
    // const v2 = lens2.getter(v1).value ;

    // // zz
    // const lens3 = xs[3]
    // const add3 = orObject(toMaybe(v))
    // const set3 = lens3.setter(add3, currentObject)
    // currentObject = lens3.getter(set3.value).value ;


    // return new instance of the outer object, with inner mutation
    return toMaybe(o)
})