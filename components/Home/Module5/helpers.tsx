/**
 * Divide a big array into an array of smaller arrays.
 * Example:
 * array = [1, 2, 3, 4, 5, 6]
 * numberOfChunks = 2
 * result = [[1, 3, 5], [2, 4, 6]]
 * Any excess numbers will also be distributed among the sub arrays.
 * 
 * @param array the original array
 * @param numberOfChunks the number of resulting subarrays
 * @returns Array<Array>
 */
export const divideArrayInChunks = (array: Array<any>, numberOfChunks: number): any => {
  const result = Array(numberOfChunks).fill(0).map(() => [])
  let currentChunk = 0
  array.reduce((acum, item) => {
    acum[currentChunk].push(item)
    currentChunk++
    if (currentChunk === numberOfChunks) {
      currentChunk = 0
    }
    return acum
  }, result)
  return result;
}
