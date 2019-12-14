const { Identity, Const, extractFrom } = require('./base-functors')
const { Contra } = require('./contravariant-functor')

const { IdentityType, ConstType } = require('./base-functor-sancturay-types')
const { ContraType } = require('./contravariant-functor-sanctuary-type')

////////////////////////////////////////////////////////////////////////////////
// Identity and Const Functors
////////////////////////////////////////////////////////////////////////////////
const {create, env} = require('sanctuary');
const {map, pipe, contramap} = create({checkTypes: true, env: env.concat(ContraType)});

// const getter = (f, x) => (pipe([
//     Const,
//     map(f),
//     extractFrom
// ])(x))
//
// const setter = (f, x) => (pipe([
//     Identity,
//     map(f),
//     extractFrom
// ])(x))
//
// const double = x => x + x
//
// console.log(getter(double, 35)) //=> 35
// console.log(setter(double, 35)) //=> 70

////////////////////////////////////////////////////////////////////////////////
// Contravariant Functor
////////////////////////////////////////////////////////////////////////////////
const isEven = Contra(x => x % 2 === 0) ;
const lengthIsEven = contramap(x => x.length, isEven)

console.log(lengthIsEven("aw"))