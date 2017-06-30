const assert = require("assert")
const { map: flMap, equals } = require('fantasy-land');

const {create, env} = require('sanctuary');
const S = create({
    checkTypes: true,
    env: env
});


// Add Sanctuary style fold
const fold = (o, f1, f2) => o.fold(f1, f2)

// Extend Maybe to Support fold
const { Maybe, Just, Nothing } = S
Maybe.prototype.fold = function(n,j)  {
    return (this.isNothing) ?
        n(this.value) :
        j(this.value) ;
}

// Extend Either to Support fold
const {Left, Right, Either, either } = S
Either.prototype.fold = function(l,r)  {
    return (this.isLeft) ?
        l(this.value) :
        r(this.value) ;
}

const nt = maybeToEither = (m) => fold(m, Left, Right)
const f = double = x => x * 2
const x = Just(3)

assert.equal(
    //nt(x)map(f) === nt(x.map(f))
    nt(x)[flMap](f)[equals](nt(x[flMap](f)))
    , true
)