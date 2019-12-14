const https = require('https');

const {create, env} = require('sanctuary');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const F = require('fluture');
const {map, pipe, reduce, keys} =
    create({checkTypes: false, env: env.concat(flutureEnv)});

const PROJECTS_URI = 'https://sci-architecture-inventory-api.us-east-1.paas.lmig.com/rest/delivery/v1/artifacts'

// :: String -> Nodeback -> _
const httpsGet = uri => done => {
    https.get(uri, res =>{
        let resultString = '' ;
        res.on('data', (d) => {
            resultString += d ;
        });

        res.on('end', _ => done(null, JSON.parse(resultString).data));

        res.on('error', e => done(e, null));
    })
}

// String -> Future e String
const httpsGetFuture = uri => F.node(
    httpsGet(uri)
)

const fork = (e, s) => o => o.fork(e, s)

const incrementPropertyIn = a => x => {
    if (a[x]) {
        a[x] += 1 ;
    } else {
        a[x] = 1 ;
    }
    return a ;
}

const getCountOfPropertiesWithinObjectsInObject = a => pipe([
    keys,
    reduce(incrementPropertyIn, a)
])

const getCountOfPropertiesWithinObjectsInArray = reduce(
    getCountOfPropertiesWithinObjectsInObject,
    {})

const getProjects = pipe([
    httpsGetFuture,
    map(getCountOfPropertiesWithinObjectsInArray),
    fork(console.error, console.log)
])



getProjects(PROJECTS_URI)