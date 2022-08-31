//////////////////////////////////////////////////////////////
//Fluture
//////////////////////////////////////////////////////////////
const Future = require('fluture');
const {env: flutureEnv} = require('fluture-sanctuary-types');
//////////////////////////////////////////////////////////////
// Sanctuary
//////////////////////////////////////////////////////////////
const $ = require('sanctuary-def')
const Z = require('sanctuary-type-classes')
const type = require('sanctuary-type-identifiers')
const {create, env} = require('sanctuary');

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
        S.map(S.map(f), self.getValue())
    )

    self[chain] = f => {
        const chainEither = either => {
            const result = S.chain(f, either)
            return result
        }

        return S.chain(
            chainEither, self.getValue()
        )
    }

    self[ap] = other =>  {
        return other.map(self.getValue());
    };

    self['fork'] = (e, s) => self.getValue().fork(
        S.either(e, e),
        S.either(e, s)
    )

    self['extract']  = [self.getValue()]

    return Object.freeze(self)
}

EitherFuture[of] = x => EitherFuture(x)
EitherFuture['@@type'] = $$type
EitherFuture['isFutureEither'] = x => x instanceof EitherFuture || type(x) === $$type;
EitherFuture['extract'] = x => x['extract']

//////////////////////////////////////////////////////////////
// EitherFuture transformers
//////////////////////////////////////////////////////////////
const eitherToFuture = either => Future[of](either)
// :: Either a b -> Future (Either a b)
const eitherToEitherFuture = either => EitherFuture(eitherToFuture(either))
// :: Future a b -> Future (Either _ b)
const futureToEitherFuture = future => EitherFuture(future[map](S.Right))

//////////////////////////////////////////////////////////////
// EitherFutureType
//////////////////////////////////////////////////////////////
const EitherFutureType = $.UnaryType(
    type.parse(EitherFuture['@@type']).name,
    'https://localhost/nothing-to-see',
    EitherFuture.isFutureEither,
    EitherFuture.extract
);

// I need to be able to add this EitherFutureType to the sanctuary environment...
//      Odd I need to do this here, but there looks to be only one env per project???
const S = create({
    checkTypes: true,
    env: env.concat(flutureEnv).concat([EitherFutureType($.Unknown) ])
});

module.exports = {
    EitherFuture: EitherFuture,
    env: [EitherFutureType($.Unknown) ],
    futureToEitherFuture: futureToEitherFuture,
    eitherToEitherFuture: eitherToEitherFuture
}