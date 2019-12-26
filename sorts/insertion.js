// CLRS page 17
const insertionSort = (array) => {
  console.log('str', array)

  // after iteration the first ith - 1 are are correctly orderer,
  //    but might not be in the final order as elements >= ith
  //    still need to considered for their place.
  for (i = 1; i < array.length; i++){
      for (j = i; j > -1; j--){

        // since it is sorter we do not need to iterate all the way IF
        //    the previous element is smaller
        if(array[j-1] > array[j]) {
          const temp = array[j-1] ;
          array[j-1] = array[j] ;
          array[j] = temp ;
        } else {
          break ;
        }
        console.log(i, j, array)
      }
  }
  return array ;
}


console.log(insertionSort([13,4,2,678,4,8]))
