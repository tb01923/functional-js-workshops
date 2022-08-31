
const bubbleSort = (array) => {
  console.log('str', array)

  const n = array.length;

  // after iteration i, the ith elemenet is in the correctly sorted spot
  for (i = 0; i < n; i++){


      // compare jth element and jth + 1 element and sqap if
      //    jth + 1should be in jth spot.
      for (j = (n - 2); j >= i; j--){
        if(array[j] > array[j+1]) {
          const temp = array[j] ;
          array[j] = array[j+1] ;
          array[j+1] = temp ;
        }
        console.log("*", array[j], array[j+1])
        console.log(i, j, j+1, array)

      }
  }
  return array ;
}


console.log(bubbleSort([13,4,2,678,4,1]))
