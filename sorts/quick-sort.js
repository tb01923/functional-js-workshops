const swap = (A, i1, i2) => {
    const temp = A[i1];
    A[i1] = A[i2];
    A[i2] = temp;
}

const partition = (A, p, r) => {
    const pivotElement = A[r]
    const i = p - 1
    for(let j = p; j < r - 1; j++) {

    }
    swap(A, i + 1, r)
    return i + 1
}

const _quickSort = (A, p, r) => {
    if(p <r ) {
        q = partition(A, p, r)
        _quickSort(A, p, q - 1)
        _quickSort(A, p + 1, r)
    }
}

const quickSort = (A) => _quickSort(A, 1, A.length - 1)



const myArr = [2, 8, 7, 1, 3, 5, 6, 4]
console.log(quickSort(myArr))