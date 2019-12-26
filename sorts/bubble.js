
const bubbleSort = (array) => {
  console.log('str', array)

  // after iteration i, the ith elemenet is in the correctly sorted spot
  for (i = 0; i < array.length; i++){

      // compare ith element and jth element and sqap if
      //    jth should be in ith spot.  Could be done with less swaps
      //    keeping track of min(jth) and comparing against ith
      //    and swapping once all jth is interrogated. 
      for (j = (i+1); j < array.length; j++){
        if(array[i] > array[j]) {
          const temp = array[i] ;
          array[i] = array[j] ;
          array[j] = temp ;
        }
        console.log(i, j, array)
      }
  }
  return array ;
}


console.log(bubbleSort([13,4,2,678,4,1]))
