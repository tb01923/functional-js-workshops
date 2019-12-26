// CLRS page 30
const arrayToStr = (A, leftIndex, rightIndex) => {
  let results = '' ;
  for(let i = leftIndex; i <= rightIndex; i++) {
    results += A[i] + ", "
  }
  return results ;
}

const merge = (A, leftIndex, middleIndex,rightIndex) => {

  const n1 = middleIndex - leftIndex + 1 ;
  const n2 = rightIndex - middleIndex ;

  let L = new Array(n1 + 1) ;
  let R = new Array(n2 + 1) ;

  // two options to intiialize Left and Right arrays
  if(true) {
      // two for loops
      for(let i = leftIndex; i <= middleIndex; i++) {
        L[i - leftIndex] = A[i]
      }

      for(let j = middleIndex + 1; j <= rightIndex; j++) {
         R[j - middleIndex - 1] = A[j]
      }
  } else {
    // single for loop with condition
    for(let k = leftIndex; k <= rightIndex; k++) {
      if(k <= middleIndex) {
        L[k - leftIndex] = A[k] ;
      } else {
        R[k - middleIndex - 1] = A[k]
      }
    }
  }

  L[n1] = Number.POSITIVE_INFINITY
  R[n2] = Number.POSITIVE_INFINITY

  for(i=0, j=0, k=leftIndex; k <=rightIndex; k++){
    if(L[i] <= R[j]) {
      A[k] = L[i] ;
      i++ ;
    } else {
      A[k] = R[j] ;
      j++ ;
    }
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
