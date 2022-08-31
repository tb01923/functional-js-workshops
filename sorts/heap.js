// Helper for Object Instantiation
const getInstance = (self, constructor) =>
    (self instanceof constructor) ?
        self :
        Object.create(constructor.prototype)


const parentIndex =  (i) => Math.floor(i/2) - 1;
const leftIndex = (i) => 2*(i+1) - 1;
const rightIndex =  (i) => 2*(i+1);

const indexOfLargest = (A, heapSize, i1, i2, i3) => {
    let largest = i3;

    if(i1 < heapSize && A[i1] > A[i3]){
        largest = i1;
    }
    // i2 has the largest element
    if(i2 < heapSize && A[i2] > A[largest]) {
        largest = i2;
    }
    return largest
}

const indexOfSmallest = (A, heapSize, i1, i2, i3) => {
    let smallest = i3;

    if(i1 < heapSize && A[i1] < A[i3]){
        smallest = i1;
    }
    // i2 has the largest element
    if(i2 < heapSize && A[i2] < A[smallest]) {
        smallest = i2;
    }
    return smallest;
}

//clrs pg 154
const heapify = (chooseBestIndex) => function _heapify(A, heapSize, i) {

    const best = chooseBestIndex(
        A, heapSize, leftIndex(i), rightIndex(i), i);

    if(best != i) {
        // swap
        const temp = A[i];
        A[i] = A[best];
        A[best] = temp;

        _heapify(A, heapSize, best)
    }

}

const Heap = function(arr) {

    const self = getInstance(this, Heap);

    self.arr = arr;
    self.heapSize = arr.length;

    self.parentElement = (i) => arr[parentIndex(i)];
    self.leftElement = (i) => arr[leftIndex(i)];
    self.rightElement = (i) => arr[rightIndex(i)];

    self.maxHeapify = (A, heapSize, i) => {
        A = (A) ? A : self.arr;
        heapSize = (heapSize) ? heapSize : self.heapSize;
        i = (i) ? i : 0;

        return heapify(indexOfLargest)(A, heapSize, i)
    }

    self.minHeapify = (A, heapSize, i) => {
        A = (A) ? A : self.arr;
        heapSize = (heapSize) ? heapSize : self.heapSize;
        i = (i) ? i : 0;

        return heapify(indexOfSmallest)(A, heapSize, i)
    }

    self.buildMaxHeap = () => {
        for(let i = self.heapSize / 2; i >= 1; i--) {
            self.maxHeapify(self.arr, self.heapSize, (i - 1));
        }
        return self.arr;
    }

    self.buildMinHeap = () => {
        for(let i = self.heapSize / 2; i >= 1; i--) {
            self.minHeapify(self.arr, self.heapSize, (i - 1));
        }
        return self.arr;
    }

    self.swap = (i1, i2) => {
        const temp = self.arr[i1];
        self.arr[i1] = self.arr[i2];
        self.arr[i2] = temp;
    }

    self.getLength = () => self.heapSize

    self.extractMax = () => {
        const max = self.arr[0]
        self.swap(0, self.getLength() - 1)
        self.heapSize = self.heapSize - 1
        self.maxHeapify(self.arr, self.heapSize, 0)
        return max
    }

    return self;
}

const sortAsc = (arr) => {
    const heap = Heap(arr)
    heap.buildMaxHeap();

    for(let i = heap.getLength(); i >= 2; i--) {
        heap.swap(0, i-1)

        heap.heapSize = heap.heapSize - 1;
        heap.maxHeapify();
    }

    return arr;
}

const sortDesc = (arr) => {
    const heap = Heap(arr)
    heap.buildMinHeap();

    for(let i = heap.getLength(); i >= 2; i--) {
        heap.swap(0, i-1)

        heap.heapSize = heap.heapSize - 1;
        heap.minHeapify();
    }

    return arr;
}

const myArr = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
sortDesc(myArr)
const myHeap = Heap(myArr)
console.log(myHeap.extractMax())
console.log(myHeap.extractMax())
console.log(myArr)
//console.log(sortDesc(myArr))

// console.log(
//     myHeap2.buildMinHeap()
// )