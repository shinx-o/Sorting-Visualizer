export const getBubbleSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations;
}

export const getInsertionSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    insertionSort(array, animations);
    return animations;
}

export const getSelectionSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSort(array, animations);
    return animations;
}

export const getQuickSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length - 1, animations);
    return animations;
}

const bubbleSort = (array, animations) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                animations.push([j, j + 1])
                animations.push([j, j + 1])
                animations.push([j + 1, j, array[j], array[j + 1]]);
                let temp = array[j + 1];
                array[j + 1] = array[j]
                array[j] = temp;
            }
        }
    }
}

const insertionSort = (array, animations) => {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1
        while (j >= 0 && array[j] > key) {
            animations.push([j, i]);
            animations.push([j, i]);
            animations.push([j + 1, j, array[j], key]);
            array[j + 1] = array[j]
            array[j] = key;
            j -= 1
        }
    }
}

const selectionSort = (array, animations) => {
    for (let i = 0; i < array.length; i++) {
        let idx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[idx]) {
                idx = j
            }
        }
        animations.push([i, idx])
        animations.push([i, idx])
        animations.push([idx, i, array[i], array[idx]]);
        let temp = array[i];
        array[i] = array[idx];
        array[idx] = temp;
    }
}

const quickSort = (array, low, high, animations) => {
    if (low < high) {
        const pivot = partition(array, low, high, animations);
        quickSort(array, low, pivot - 1, animations)
        quickSort(array, pivot + 1, high, animations)
    }
}

const partition = (array, low, high, animations) => {
    let pivot = array[high]
    let j = low
    for (let i = low; i < high; i++) {
        if (array[i] <= pivot) {
            animations.push([i, j])
            animations.push([i, j])
            animations.push([i, j, array[j], array[i]])
            let temp = array[j]
            array[j] = array[i]
            array[i] = temp
            j++;
        }
    }

    animations.push([j, high])
    animations.push([j, high])
    animations.push([j, high, array[high], array[j]])
    let temp = array[high]
    array[high] = array[j]
    array[j] = temp

    return j
}
