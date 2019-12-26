// https://www.geeksforgeeks.org/in-place-merge-sort/

const arrayToStr = (A, leftIndex, rightIndex) => {
    let results = '' ;
    for(let i = leftIndex; i <= rightIndex; i++) {
        results += A[i] + ", "
    }
    return results ;
}

const merge = (A, leftIndex, middleIndex, rightIndex) => {

  let l = leftIndex ;
  let r = middleIndex + 1 ;

  while(l <= middleIndex &&  r <= rightIndex) {
    if(A[r] < A[l]){
      const temp = A[r] ;
      for(let tempIndex = r; tempIndex > l; tempIndex--) {
        A[tempIndex] = A[tempIndex - 1]
      }
      A[l] = temp ;
      r++ ;
      middleIndex++ ;
    }
    l++ ;
  }

  return A ;
}

const _mergeSort = (array, leftIndex, rightIndex) => {

    if(leftIndex < rightIndex) {

      const middleIndex = Math.floor((leftIndex + rightIndex) / 2) ;

      _mergeSort(array, leftIndex, middleIndex);
      _mergeSort(array, middleIndex+1, rightIndex) ;
      merge(array, leftIndex, middleIndex, rightIndex) ;
    }

    return array ;
}

const mergeSort = (array) =>
  _mergeSort(array, 0, array.length -1)

//console.log(mergeSort([13,4,2,678,4,8,9]))
console.log(mergeSort([14, 7, 3, 12, 9, 11, 6 , 2]))
//console.log(mergeSort([14, 7, 3, 12]))
