const {reduceC : reduce} = require('../lesson-3-reduce-plus/reduce')
const { append } = require('../lesson-3-reduce-plus/array-copy')

const setA = [
    {id: 1, val: "A::1"},
    {id: 2, val: "A::2"},
    {id: 3, val: "A::3"},
    {id: 4, val: "A::4"}
]

const setB = [
    {id: 3, val: "B::3"},
    {id: 4, val: "B::4"},
    {id: 5, val: "B::5"}
]


const isKeysEqual = (keyA, keyB) =>
    (a,b) =>
        keyA(a) === keyB(b)

const addProperty = (o, k, v) => { o[k] = v; return o }

const fromInstanceAToSetAB = (nameA, nameB, isKeysEqual, B) =>
    a => reduce(
            (agg, b) =>
                isKeysEqual(a,b) ?
                    append(agg,
                        addProperty(
                            addProperty({}, nameA, a)
                            , nameB, b)
                    ) :
                    agg ,
            [],
            B
        )

const fromInstanceAToSetAOptionalB = (nameA, nameB, isKeysEqual, B) =>
    a => reduce(
        (agg, b) =>
            isKeysEqual(a,b) ?
                append(agg,
                    addProperty(
                        addProperty({}, nameA, a)
                        , nameB, b)
                ) :
                append(agg,
                    addProperty(
                        addProperty({}, nameA, a)
                        , nameB, null)
                ) ,
        [],
        B
    )

const fromSetAToSetAB = aToSetAB =>
    reduce(
        (agg, a) => {
            return agg.concat(
                aToSetAB(a)
            )
        },
        []
    )

// :: ((a -> object), (b -> object), [a], [b]) -> [{a:a, b:b}]
const innerJoin = (keyA, keyB, nameA, nameB, setA, setB) => {

    const aToSetAB = fromInstanceAToSetAB(
        nameA,
        nameB,
        isKeysEqual(keyA, keyB),
        setB
    )

    const setAtoSetB = fromSetAToSetAB(aToSetAB)

    const setAB = setAtoSetB(setA)

    return setAB
}

const leftJoin = (keyA, keyB, nameA, nameB, setA, setB) => {

    const aToSetAB = fromInstanceAToSetAOptionalB(
        nameA,
        nameB,
        isKeysEqual(keyA, keyB),
        setB
    )

    const setAtoSetB = fromSetAToSetAB(aToSetAB)

    const setAB = setAtoSetB(setA)

    return setAB
}

const getId = a => a.id

console.log(
    innerJoin(getId, getId, 'setA', 'setB', setA, setB),
)
console.log(
    leftJoin(getId, getId, 'setA', 'setB', setA, setB)
)