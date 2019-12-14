const {contramap: contramapFl, extract } = require('fantasy-land');
const { getInstance } = require('./base-functors.js')

/*
    Contravariant Functor
    contramap :: F a ~> (b -> a) -> F b
    Where a is a function from (a -> c)
    Yielding F b where b is a function from b -> c

 */

const gAfterF = g => f => x => g(f(x))



// Contra (b -> c)
const Contra = function(g){
    const self = getInstance(this, Contra)

    // :: ~> (a -> b) -> Contra (a -> c)
    self[contramapFl] = f => Contra( x => g(f(x)) )
    self[extract] = g
    self['@@type'] =  'fs-javascript/contra'

    return Object.freeze(self)
}
Contra['@@type'] =  'fs-javascript/contra'

const { Identity, Const, extractFrom } = require('./base-functors')

const $ = require('sanctuary-def');
const type = require('sanctuary-type-identifiers');
const Z = require('sanctuary-type-classes') ;

const isContra = x => x['@@type'] === 'fs-javascript/contra'

const ContraType = $.UnaryType(
    'fs-javascript/contra',
    'http://example.com/fs-javascript#Contra',
    isContra,
    x => [x[extract]])($.Unknown)

const { create, env } = require('sanctuary');
const { contramap } = create({checkTypes: true, env: env.concat(ContraType) });

const def = $.create({ checkTypes: true, env: $.env.concat(ContraType) });

const contramap2 =
    def('contramap2', {}, [$.Unknown, ContraType, ContraType],
        (f, x) => {
            const z = x[contramapFl](f)
            return z
        }
    )

const isEven = Contra(x => x % 2 === 0) ;
console.log(Z.Contravariant.test(isEven)) // => true

const isLengthEvenContra = contramap(y => y.length, isEven)
const isStringLengthEven = isLengthEvenContra[extract]

console.log(isStringLengthEven("asw")) //=> false