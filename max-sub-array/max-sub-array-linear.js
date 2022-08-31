// CLRS Page 68
// https://www.youtube.com/watch?v=2MmGzdiKR9Y

const makeMax = (leftIndex, rightIndex, sum) => {
    return {leftIndex, rightIndex, sum}
}

const add2 = (a,b) => a + b ;
const sumList = xs => xs.reduce(add2, 0) ;

const _maxSubArray = (array, leftIndex, rightIndex) => {
  const results = new Array(rightIndex)
  results[leftIndex] = makeMax(leftIndex, leftIndex, array[leftIndex]) ;
  let max = results[leftIndex]

  for(let i = leftIndex + 1; i <= rightIndex; i++){
     const prev = results[i-1] ;

     const subArray = makeMax(prev.leftIndex, i, array[i] + prev.sum) ;
     const singleElement = makeMax(i, i, array[i]) ;

     const bestChoiceForThisEndPoint = (subArray.sum > singleElement.sum) ?
        subArray :
        singleElement ;

     results[i] = bestChoiceForThisEndPoint ;
     if(bestChoiceForThisEndPoint.sum > max.sum) {
       max = bestChoiceForThisEndPoint ;
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
