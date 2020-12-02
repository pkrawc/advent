const { readInput, test } = require("../utils")

const prepareInput = (rawInput) => rawInput.trim().split(/\n/).map(Number)

const input = prepareInput(readInput())

function partOne(arr) {
  for (let a = 0; a < arr.length; a++) {
    const bArr = arr.slice(a + 1)
    for (let b = 0; b < bArr.length; b++) {
      if (arr[a] + bArr[b] === 2020) {
        return arr[a] * bArr[b]
      }
    }
  }
  return false
}

function partTwo(arr) {
  for (let a = 0; a < arr.length; a++) {
    const bArr = arr.slice(a + 1)
    for (let b = 0; b < bArr.length; b++) {
      const cArr = bArr.slice(b + 1)
      for (let c = 0; c < cArr.length; c++) {
        if (arr[a] + bArr[b] + cArr[c] === 2020) {
          return arr[a] * bArr[b] * cArr[c]
        }
      }
    }
  }
  return false
}

/* Tests */

// test(result, expected)

/* Results */

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")

console.time("Part Two Time")
const partTwoResult = partTwo(input)
console.timeEnd("Part Two Time")

console.log("Solution to part 1: ", partOneResult)
console.log("Solution to part 2: ", partTwoResult)
