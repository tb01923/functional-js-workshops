// CLRS Page 68
// https://www.youtube.com/watch?v=2MmGzdiKR9Y

const _maxCrossArray = (array, leftIndex, middleIndex, rightIndex) => {
  let leftSum = Number.NEGATIVE_INFINITY ;
  let rightSum = Number.NEGATIVE_INFINITY ;

  let left = middleIndex  ;
  let right = middleIndex  ;

  let leftRunningSum = 0 ;
  for(let i = middleIndex; i >= leftIndex; i--){
    leftRunningSum += array[i]
    if(leftRunningSum > leftSum) {
      leftSum = leftRunningSum
      left = i
    }
  }

  let rightRunningSum = 0 ;
  for(let i = middleIndex + 1; i <= rightIndex; i++){
    rightRunningSum += array[i]
    if(rightRunningSum > rightSum) {
      rightSum = rightRunningSum
      right = i
    }
  }

  const result = {
    leftIndex: left,
    rightIndex: right,
    sum: leftSum + rightSum
  }

  return result ;
}
const _maxSubArray = (array, leftIndex, rightIndex) => {

    let results = null ;
    if(leftIndex === rightIndex) {
        const sum = array[leftIndex]
        results = {leftIndex, rightIndex, sum} ;
        results.side = "one" ;
    }
    else {

      const middleIndex = Math.floor((leftIndex + rightIndex) / 2) ;
      const left = _maxSubArray(array, leftIndex, middleIndex);
      const middle = _maxCrossArray(array, leftIndex, middleIndex, rightIndex);
      const right =_maxSubArray(array, middleIndex+1, rightIndex) ;

      if(left.sum >= right.sum && left.sum >= middle.sum) {
          left.side = "left"
          results = left ;
      }
      else if(middle.sum >= left.sum  && middle.sum >= right.sum) {
          middle.side = "middle"
          results =  middle ;
      }
      else if(right.sum >= left.sum  && right.sum >= middle.sum) {
          right.side = "right"
          results =  right ;
      }

    }

    //console.log(`${id} (${leftIndex},${rightIndex}) [${arrayToStr(array, leftIndex, rightIndex)}] `)
    return results ;
}

const makeDelta = (array) => {
    const deltaArray = [] ;
    for(let i = 1; i < array.length; i++) {
        deltaArray.push(array[i] - array[i-1])
    }
    return deltaArray ;
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
    side: max.side,
    array: array.slice(max.leftIndex, max.rightIndex + 1)
  }
}

const maximizeReturn = (array) => {
    const deltaArray = makeDelta(array)

    // console.log(array)
    // console.log(deltaArray) ;

    const max = maxSubArray(deltaArray)

    max.originalArray = array.slice(max.leftIndex, max.rightIndex)

    return max ;
}

// console.log(maxSubArray([14, 7, 3, 12, 9, 11, 6 , 2]))
console.log(maximizeReturn([100, 113, 110, 85, 105, 102, 86, 63, 81, 101, 94, 106, 101, 79, 94, 90, 97]))


//console.log(maxSubArray([12]))            // { leftIndex: 0, rightIndex: 0, sum: 12, side: 'one', array: [12] }
//console.log(maxSubArray([12, -1, 13]))    // { leftIndex: 0, rightIndex: 2, sum: 24, side: 'middle', array: [12, -1, 13] }
//console.log(maxSubArray([-2, -1, 13]))    // { leftIndex: 2, rightIndex: 2, sum: 13, side: 'right', array: [13] }
//console.log(maxSubArray([12, 13]))        // { leftIndex: 0, rightIndex: 1, sum: 25, side: 'middle', array: [12, 13] }
//console.log(maxSubArray([12, -1, -13]))   // { leftIndex: 0, rightIndex: 0, sum: 13, side: 'left', array: [12] }
