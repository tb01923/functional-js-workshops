
const merge = (leftArray, rightArray) => {
  let sortedArray = []
  let l = 0, r = 0 ;

  while(l < leftArray.length && r < rightArray.length) {
    if(leftArray[l] < rightArray[r]) {
      sortedArray.push(leftArray[l]) ;
      l++ ;
    } else {
      sortedArray.push(rightArray[r]) ;
      r++ ;
    }
  }

  while(l < leftArray.length) {
    sortedArray.push(leftArray[l]) ;
    l++ ;
  }

  while(r < rightArray.length) {
    sortedArray.push(rightArray[r]) ;
    r++ ;
  }

  return sortedArray ;
}

const mergeSort = (array) => {

    const start = 0 ;
    const end = array.length ;

    if(start >= (end - 1)) {
      // The base case:

      //any array of length 1 is already sorted
      return array ;
    }
    else {
      // the inductive step:

      // 1. split input into two subarrays,
      const middle = Math.floor((start + end) / 2) ;
      const sliceLeft = array.slice(start, middle) ;
      const sliceRight = array.slice(middle, end) ;

      // 2. recurse each and
      const leftArrayResults = mergeSort(sliceLeft) ;
      const rightArrayResults = mergeSort(sliceRight) ;

      // 3. merge the results
      return merge(
          leftArrayResults,
          rightArrayResults)
    }

}

console.log(mergeSort([13,4,2,678,4,8,9]))
