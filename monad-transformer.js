/**
 * Created by tbrown on 6/23/17.
 */

const { EitherFuture, futureToEitherFuture, env: futureEitherEnv } = require('frt-future-either')
const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');

//const env2 = env.concat(futureEitherEnv)
const S = create({
    checkTypes: false,
    env: env.concat(flutureEnv)
});

const Future = require('fluture');


const oracle = {
    "1": {id: 1, name: 'bob', bff: 2},
    "2": {id: 2, name: 'alice', bff: 1}
} ;

const { curry  } = require('./list-processing-helpers')
const {Left, Right, either } = S

// :: object -> int ->  Future _ (Either e s)
const findById = curry((data, id) => {
    const idS = id.toString()
    // return Future((reject, resolve) => {
    //     data[idS] ?
    //         setTimeout(resolve, 1000, Right(data[idS])) :
    //         reject(Left("Not Found")) ;
    // });
    return data[idS] ?
        Right(
            Future((reject, resolve) => {
                setTimeout(resolve, 1000, data[idS])
            })
        ) :
        Left(
            Future.reject("Not Found")
        ) ;

    // Future((reject, resolve) => {
    //     data[idS] ?
    //         setTimeout(resolve, 1000, Right(data[idS])) :
    //         reject(Left("Not Found")) ;
    // });
})

const addMom = curry((mom, person) => {
    return Future((reject, resolve) => {
        person.mother = mom
        setTimeout(resolve, 1000, person)
    })
})

// const fold = (o, f1, f2) => o.fold(f1, f2)
// const eitherToFuture = (e) => fold(e, Future.rejected, Future.of)
// findById(oracle, 2)
//     .chain(eitherToFuture)
//     .chain(u => findById(oracle, u.bff))
//     .chain(eitherToFuture)
//     .fork(console.error, console.log)


const findByIdEF = curry((a,b) => EitherFuture(findById(a,b)))

const beforeExit = f => x => {
    f(x)
    process.exit()
}

const { map, chain, ap, of } = require('fantasy-land');
const { pipe  } = S
const ef2 = findByIdEF(oracle, 1)
     [map](person => {
         person.test=true ;
         return person
     })
     // .chain(d => {
     //     const r = findById(oracle, d)
     //     return r
     // })
    [chain](x => {
        const withMom = addMom('ann', x)
        const y = futureToEitherFuture(withMom)
        return y
    })
    .fork(beforeExit(console.error), beforeExit(console.log))



