const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) =>
  rawInput.split("\n\n").map((line) => line.split("\n"))

const input = prepareInput(readInput())

function partOne(input) {
  return input
    .map((group) => {
      let sum = 0
      group.forEach((cal) => {
        sum += parseInt(cal)
      })
      return sum
    })
    .sort()
    .reverse()
    .splice(0, 3)
    .reduce((a, b) => a + b)
}

function partTwo(input) {
  return
}

/* Tests */

// test(result, expected)

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
