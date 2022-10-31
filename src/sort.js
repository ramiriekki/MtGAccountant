function sort(array){
    if (array.length <= 1){
        return array
    }

    let pivot = array[array.length - 1] // pivot at end
    
    let left = []
    let right = []
    let duplicatePivots = []

    for (let i = 0; i < array.length - 1; i++){
        if (array[i] < pivot){
            left.push(array[i])
        } else if (array[i] > pivot){
            right.push(array[i])
        } else if (array[i] == pivot){
            duplicatePivots.push(array[i])
        }
    }

    return sort(left).concat(pivot, duplicatePivots, sort(right));
}

// array = [7, -2, 4, 1, 6, 5, 0, -4, 2]
// sorted = sort(array)

// console.log(sorted)