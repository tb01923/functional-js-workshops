// CLRS Page 75
// https://www.mathsisfun.com/algebra/matrix-multiplying.html
// https://www.mathwarehouse.com/algebra/matrix/multiply-matrix.php

/*
         M1              M2                  M3
     [ A , B ]       [ E , F ]      [ AE + AF , BE + BF ]
                 .              =
     [ C , D ]       [ G , H ]      [ CG + CH , DG + DH ]

     Where
     M1.rows = M2.columns
     M1.columns = M3.rows

     AND M3.rows = M1.rows AND M3.columns = M2.columns
*/

const and = (a,b) => a && b
const validateRows = (n, matrix) => matrix.length === n
const validateColumns = (n, matrix) => matrix.reduce(
  (isValid, row) => and(isValid, row.length === n)
)
const makeMatrix = (rows, columns) =>
  Array(rows).fill(null).map(() => Array(columns).fill(null)) ;

const validateMatrix = (rows, columns, matrix) =>
  validateRows(rows, matrix) &&
  validateColumns(columns, matrix)

const getRows = M => M.length ;
const getCols = M => M[0].length ;

const isMatrixMultiplyCompatible = (A, B) => {
  const aRows = getRows(A) ;
  const aCols = getCols(A) ;

  const isAColsConsistent = validateColumns(aCols, A) ;
  if(isAColsConsistent){
    const isBCompatibleWithA = validateMatrix(aCols, aRows, B);
    return isBCompatibleWithA ;
  }
  return false ;
}

const multiplyMatrix = (A, B) => {
    const r = getRows(A) ;
    const c = getCols(A) ;
    const c2 = getCols(B) ;
    const C = makeMatrix(r, c2);
    for(i = 0; i < r; i++){       // A.rows
      for(j = 0; j < r; j++) {    // A.rows ~ B.cols
        C[i][j] = 0;
        for(k = 0; k < c; k++) {  // A.cols ~ B.rows
          C[i][j] = C[i][j] + A[i][k] * B[k][j]
        }
      }

    }
    return C ;
}

console.log(makeMatrix(3,2))
console.log(validateMatrix(3,2, makeMatrix(3,2)))
console.log(validateMatrix(2,3, makeMatrix(2,3)))
console.log(isMatrixMultiplyCompatible(makeMatrix(3,2), makeMatrix(2,3)))
console.log(multiplyMatrix([[1,2],[3,4]], [[2,0],[1,2]]))
//=> [ [ 4, 4 ], [ 10, 8 ] ]
console.log(multiplyMatrix([[2,0],[1,2]], [[1,2],[3,4]]))
//=> [ [ 2, 4 ], [ 7, 10 ] ]
console.log(multiplyMatrix([[1,2,3],[4,5,6]], [[7,8],[9,10], [11,12]]))
