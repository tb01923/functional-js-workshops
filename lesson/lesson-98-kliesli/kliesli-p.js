const {map, chain, pipe} = require('ramda')
const {of, map: fantasyMap, chain: fantasyChain, extract: fantasyExtract} = require('fantasy-land');

////////////////////////////////////////////////////////////////////////////////////////
//// some helpers
////////////////////////////////////////////////////////////////////////////////////////

// :: [a] -> a | null
const last = xs => (xs.length > 0)
    ? xs[xs.length - 1]
    : Promise.resolve(null) ;

// :: ([a], a) -> a
const append = (xs, x) => xs.concat([x])

// K combinator a function to constant
// :: a -> _ -> a
const K = x => _ => x

// :: a -> b
const extract = o => o[fantasyExtract]()

////////////////////////////////////////////////////////////////////////////////////////
//// Your database "Kliesli" representation (this needs Chain impkemented to handle async bits)
////////////////////////////////////////////////////////////////////////////////////////

const Database = function (connection, results) {

    this[fantasyMap] = f => {

        //=> Promise(result)
        const result =
            // wait on connection
            connection.then(conn =>
                // wait on last result
                last(results).then(lastResult =>
                    // invoke next function with connection and last result
                    f(conn, lastResult)
                )
            )

        return Database[of](
            connection,
            append(results, result)
        )
    }

    this[fantasyExtract] = K(last(results))
}

Database[of] = (connection, results) => new Database(connection, results || [])


////////////////////////////////////////////////////////////////////////////////////////
//// Your database connect and query code
////////////////////////////////////////////////////////////////////////////////////////
const increment = x => x + 1

const connect = async connectionStr => {
    return  {connection: true}
}

const query1 = async (conn) => {
    if(conn.connection === false) throw new Error("not connected")
    return {obj: 1}
}

const query2 = async (conn, r1) => {
    if(conn.connection === false) throw new Error("not connected")
    return {obj: increment(r1.obj) }
}

const query3 = async (conn, r2) => {
    if(conn.connection === false) throw new Error("not connected")
    return {obj: increment(r2.obj)}
}

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

connectAndRun("some connection string")     // Promise({obj: 3})
    .then(
        someY => {                          // {obj: 3}
            const ten = 10
        }
    )


