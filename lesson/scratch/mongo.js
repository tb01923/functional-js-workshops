// const mongoMw = (url, options) =>
//     let _db = null ;
//     mongodb.MongoClient.connect(url, function (err, db) {
//         if(err) reject(err);
//         _db = db
//     });
//
//     return async function (ctx, next) {
//
//     }
//


const arrs = [
    [1, 2, 3, 4],
    [3, 5, 10, 11],
    [10, 12, 13]
];

const concat = (arr, x) => {
    arr.push(x) ;
    return arr ;
}

const reduceUniqueElementsOnto = (arr, x) =>
    (arr.includes(x)) ?  arr : concat(arr, x)

const reduceUniqueArrayElementsOnto = (agg, arr) =>
    arr.reduce(reduceUniqueElementsOnto, agg)

const results = arrs.reduce(reduceUniqueArrayElementsOnto, [])

console.log(results)