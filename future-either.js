//////////////////////////////////////////////////////////////
//Fluture
//////////////////////////////////////////////////////////////
const Future = require('fluture');
const {env: flutureEnv} = require('fluture-sanctuary-types');
//////////////////////////////////////////////////////////////
// Sanctuary
//////////////////////////////////////////////////////////////
const $ = require('sanctuary-def')
const type = require('sanctuary-type-identifiers')
const {create, env} = require('sanctuary');
const _S = create({
    checkTypes: true,
    env: env.concat(flutureEnv)
});
//////////////////////////////////////////////////////////////
// Fantasy Land
//////////////////////////////////////////////////////////////
const { map, chain, ap, of } = require('fantasy-land');


// :: a | undefined -> (() -> a) -> a
const getInstance = (self, constructor) =>
    (self instanceof constructor) ?
        self :
        Object.create(constructor.prototype)

//////////////////////////////////////////////////////////////
// EitherFuture
//////////////////////////////////////////////////////////////
const $$type = 'functional-js-workshops/EitherFuture@0.0.1'
function EitherFuture(_value){

    const self = getInstance(this, EitherFuture)

    self['@@type'] = $$type

    self.getValue = () =>
        _value

    self[map] = f => EitherFuture(
        _S.map(_S.map(f), self.getValue())
    )

    self[chain] = f => {
        const handleE = e => {
            return _S.chain(f, e)
        }

        return _S.chain(
            handleE, self.getValue()
        )
    }

    self[ap] = other =>  {
        return other.map(self.getValue());
    };

    self['fork'] = (e, s) => self.getValue().fork(
        _S.either(e, e),
        _S.either(e, s)
    )

    self['extract']  = self.getValue()

    return Object.freeze(self)
}

EitherFuture[of] = x => EitherFuture(x)
EitherFuture['@@type'] = $$type
EitherFuture['isFuture'] = x => x instanceof EitherFuture || type(x) === $$type;
EitherFuture['extract'] = x => x['extract']

//////////////////////////////////////////////////////////////
// EitherFuture transformers
//////////////////////////////////////////////////////////////
// :: Either a b -> Future (Either a b)
const eitherToEitherFuture = either => EitherFuture(Future[of](either))
// :: Future a b -> Future (Either _ b)
const futureToEitherFuture = future => EitherFuture(future[map](_S.Right))

//////////////////////////////////////////////////////////////
// EitherFutureType
//////////////////////////////////////////////////////////////
const EitherFutureType = $.UnaryType(
    type.parse(EitherFuture['@@type']).name,
    'https://localhost/nothing-to-see',
    EitherFuture.isFuture,
    EitherFuture.extract
);

module.exports = {
    EitherFuture: EitherFuture,
    env: [EitherFutureType($.Unknown) ],
    futureToEitherFuture: futureToEitherFuture,
    eitherToEitherFuture: eitherToEitherFuture
}