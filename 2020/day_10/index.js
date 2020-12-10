const { combination } = require("generatorics")
const { readInput, test } = require("../../utils")

const rawTestInput = `
28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3
`

const prepareInput = (rawInput) => rawInput.trim().split(/\n/)

const input = prepareInput(readInput())

// const testInput = prepareInput(rawTestInput)

/**
 *
 *
 * @param {array} adapters adapters list.
 */
function findDifference(adapters) {
  return adapters.reduce(
    (obj, joltage, idx, array) => {
      const diff = joltage - array[idx - 1]
      if (diff === 3) {
        return {
          ...obj,
          three: obj.three + 1,
        }
      }
      if (diff === 1) {
        return {
          ...obj,
          one: obj.one + 1,
        }
      }
      return obj
    },
    { one: 0, three: 0 }
  )
}

function partOne(input) {
  const sorted = input.map(Number).sort((a, b) => a - b)
  const diff = findDifference([0, ...sorted, sorted[sorted.length - 1] + 3])
  return diff.one * diff.three
}

function findCombinations(array, cache = {}) {
  const key = array.join(",")
  if (key in cache) {
    // Don't even bother if we have the current array combinations.
    return cache[key]
  }
  let result = 1 // It'll always at least be one combination.
  for (let idx = 1; idx < array.length - 1; idx++) {
    // console.log(array[idx + 1], array[idx - 1])
    const diff = array[idx + 1] - array[idx - 1]
    if (diff < 4) {
      const newArray = [array[idx - 1], ...array.slice(idx + 1)]
      // console.log(newArray)
      result += findCombinations(newArray, cache)
    }
  }
  cache[key] = result
  return result
}

function partTwo(input) {
  const sorted = input.map(Number).sort((a, b) => a - b)
  return findCombinations([0, ...sorted, sorted[sorted.length - 1] + 3])
}

/* Tests */

// const difference = findJoltageDifference(testInput)

// test(difference, 220)

/* Results */

console.log("-----------------")

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")
console.log("Solution to part 1: ", partOneResult)

console.log("-----------------")

console.time("Part Two Time")
const partTwoResult = partTwo(input)
console.timeEnd("Part Two Time")
console.log("Solution to part 2: ", partTwoResult)

console.log("-----------------")
