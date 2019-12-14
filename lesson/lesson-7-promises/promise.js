const {readFile} = require('fs')

///////////////////////////////////////////////////////////////
// readFile('../../package.json', 'utf-8',  (err, data) => {
//     console.log('old', data)
// })


// convert a traditional nodeback style call back to promise style
const asPromise = (traditionalNodeBack) => (...args) => {

    const thens = [] ;
    const catchers = [] ;

    const promise = {
        "then": then => {
            thens.push(then)
            return promise
        },
        "catch": catcher => {
            catchers.push(catcher)
            return promise
        }
    }

    const resolveOrReject = (err, data) => {
        if(data) {
            thens.forEach(then => then(data))  ;
        } else if(err) {
            catchers.forEach(catcher => catcher(err))  ;
        }
    }

    traditionalNodeBack.call(null, ...args, resolveOrReject)


    return promise ;
}

const readFileAsPromise = asPromise(readFile)

readFileAsPromise('../../package.json', 'utf-8').then(console.log).catch(console.error)