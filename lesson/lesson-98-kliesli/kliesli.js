const {map, pipe} = require('ramda')
const {of, map: fantasyMap, extract: fantasyExtract, equals} = require('fantasy-land');

////////////////////////////////////////////////////////////////////////////////////////
//// some helpers
////////////////////////////////////////////////////////////////////////////////////////

// K combinator a function to constant
// :: a -> _ -> a
const K = x => _ => x

// :: a -> b
const extract = o => o[fantasyExtract]()

////////////////////////////////////////////////////////////////////////////////////////
//// Your database "Kliesli" representation (this needs Chain impkemented to handle async bits)
////////////////////////////////////////////////////////////////////////////////////////

const Database = function (connection, result) {

    this[fantasyMap] = f => {
        const newResult = f(result, connection)
        return Database[of](
            connection,
            newResult
        )
    }

    this[fantasyExtract] = K(result)
}

Database[of] = (connection, result) => new Database(connection, result || undefined)


////////////////////////////////////////////////////////////////////////////////////////
//// Your database connect and query code
////////////////////////////////////////////////////////////////////////////////////////
const increment = x => x + 1

const connect = connectionStr => {
    return  {connection: true}
}

const query1 = (_, conn) => {
    if(conn.connection === false) throw new Error("not connected")
    return {obj: 1}
}

const query2 = (r1, conn) => {
    if(conn.connection === false) throw new Error("not connected")
    return {obj: increment(r1.obj) }
}

const query3 = (r2, conn) => {
    if(conn.connection === false) throw new Error("not connected")
    return {obj: increment(r2.obj)}
}

////////////////////////////////////////////////////////////////////////////////////////
//// Kliesli Composition with Fantasyland style
////////////////////////////////////////////////////////////////////////////////////////
const x = Database[of](connect("some connection string"))
    [fantasyMap](query1)
    [fantasyMap](query2)
    [fantasyMap](query3)
    [fantasyExtract]() ;
//=> {obj: 3}


////////////////////////////////////////////////////////////////////////////////////////
//// Kliesli Composition with Sanctuary / Ramda style
////    (they handle the fanatsy-lamnd compliant naming convention internally), etc
////////////////////////////////////////////////////////////////////////////////////////
const connectAndRun = pipe(
    connect,
    Database[of],
    map(query1),
    map(query2),
    map(query3),
    extract
)

const y = connectAndRun("some connection string")
//=> {obj: 3}

////////////////////////////////////////////////////////////////////////////////////////
//// Tests of Algebras
////////////////////////////////////////////////////////////////////////////////////////
const {identity, composition} = require('fantasy-land/laws/functor');


const isFunctor = (of, x, f, g) => {
    const eq = (a, b) => extract(a) === extract(b) ;
    const passesIdentity = identity(of)(eq)(x)
    const passesComposition = composition(of)(eq)(f)(g)(x)
    return passesIdentity && passesComposition
}

const isDbFunctor = isFunctor(Database[of], connect("some connection string"), query1, query2)

// Composition
// const c1 = db[fantasyMap](
//         (r, conn) => query2(query1(r, conn), conn)
//     )
//
// const c2 = db[fantasyMap](query1)[fantasyMap](query2)
// const passesComposition = eq( c1, c2 )

const breakpoint = null

