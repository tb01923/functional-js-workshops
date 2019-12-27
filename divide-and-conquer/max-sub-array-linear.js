const makeMax = (leftIndex, rightIndex, sum) => {
    return {leftIndex, rightIndex, sum}
}

const add2 = (a,b) => a + b ;
const sumList = xs => xs.reduce(add2, 0) ;

const _maxSubArray = (array, leftIndex, rightIndex) => {
  const results = new Array(rightIndex)
  let max = makeMax(undefined, undefined, Number.NEGATIVE_INFINITY) ;

  for(let i = leftIndex; i <= rightIndex; i++){
     const prev = (i > 0) ? results[i-1] : makeMax(0, 0, 0) ;
     const contiguous = makeMax(prev.leftIndex, i, array[i] + prev.sum) ;
     const singular =  makeMax(i, i, array[i]) ;
     const current = (contiguous.sum > singular.sum) ? contiguous : singular ;
     results[i] = current ;
     if(current.sum > max.sum) {
       max = current ;
     }
  }
  return max
}

const maxSubArray = (array) => {

    const max = _maxSubArray(
        array,
        0,
        array.length - 1
    )

  return {
    leftIndex: max.leftIndex,
    rightIndex: max.rightIndex,
    sum: max.sum,
    array: array.slice(max.leftIndex, max.rightIndex + 1)
  }
}

const makeDelta = (array) => {
    const deltaArray = [] ;
    for(let i = 1; i < array.length; i++) {
        deltaArray.push(array[i] - array[i-1])
    }
    return deltaArray ;
}

const maximizeReturn = (array) => {
    const deltaArray = makeDelta(array)
    const max = maxSubArray(deltaArray)

    max.originalArray = array.slice(max.leftIndex, max.rightIndex + 1)
    return max ;
}

console.log(maximizeReturn([100, 113, 110, 85, 105, 102, 86, 63, 81, 101, 94, 106, 101, 79, 94, 90, 97]))

console.log(maxSubArray([-2, -1, 13]))    // { leftIndex: 2, rightIndex: 2, sum: 13, side: 'right', array: [13] }
console.log(maxSubArray([12]))            // { leftIndex: 0, rightIndex: 0, sum: 12, side: 'one', array: [12] }
console.log(maxSubArray([12, -1, 13]))    // { leftIndex: 0, rightIndex: 2, sum: 24, side: 'middle', array: [12, -1, 13] }
console.log(maxSubArray([-2, -1, 13]))    // { leftIndex: 2, rightIndex: 2, sum: 13, side: 'right', array: [13] }
console.log(maxSubArray([12, 13]))        // { leftIndex: 0, rightIndex: 1, sum: 25, side: 'middle', array: [12, 13] }
console.log(maxSubArray([12, -1, -13]))   // { leftIndex: 0, rightIndex: 0, sum: 13, side: 'left', array: [12] }
