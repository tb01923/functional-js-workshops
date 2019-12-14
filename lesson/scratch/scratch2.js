var randomBool = () => Math.random() >= 0.5;

const someThrowable = _ => {
    if(randomBool())
        return "Whoopeee"
    else
        throw "RPC ISSUES"
}

const someCps = (_, cb) => {

    try {
        if(randomBool()){
            const r = someThrowable()
            // got a good result, return it
            return cb(null, r)
        }
        else{
            // the call was successful, but there was a deeper error (bad query)
            return cb(null, new Error("Your query wan't formatted correctly"))
        }
    }
    catch(e) {
        // the call had a problem (RPC issues)
        return cb(e)
    }

}

const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const F = require('fluture');
const S = create({checkTypes: false, env: env.concat(flutureEnv)});

const someFuture = F.encaseN(someCps)

const toEither = x => {
    if (x instanceof Error)
    {
        return S.Left(x)
    }
    else
    {
        return  S.Right(x)
    }
}

const formatResults = result => "you returned this result: " + result ;

// in the scala style
someFuture().
    map(toEither).                   // This only works on the success side
    map(S.map(formatResults)).       // do something with the success::right side
    fork(console.error, console.log)

const forkWith = (fe, fs) => f => f.fork(fe, fs)

// in the haskell style
const makeCall = S.pipe([
    someFuture,
    S.map(toEither),                // This only works on the success side
    S.map(S.map(formatResults)),    // do something with the success::right side
    forkWith(console.error, console.log)
])

makeCall(null)