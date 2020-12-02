const { readInput, test } = require("../utils")

const prepareInput = (rawInput) => rawInput

const input = prepareInput(readInput())

function partOne(input) {
  return
}

function partTwo(input) {
  return
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
