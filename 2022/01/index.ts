import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n\n").map((line) => line.split("\n"))

const input = prepareInput(readInput())

function getLargestCalories(input: string[][]) {
  return input
    .map((group) => {
      let sum = 0
      group.forEach((cal) => {
        sum += parseInt(cal)
      })
      return sum
    })
    .sort((a, b) => b - a)
}

function partOne(input) {
  return getLargestCalories(input)[0]
}

function partTwo(input) {
  return getLargestCalories(input)
    .splice(0, 3)
    .reduce((a, b) => a + b, 0)
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

export {}
