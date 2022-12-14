import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((seam) =>
      seam.split(" -> ").map((coord) => coord.split(",").map(Number))
    )

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input) {
  console.log(input)
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const partOneTest = partOne(testInput)

test(partOneTest, 3)

/* Results */

// console.log("-----------------")

// console.time("Part One Time")
// const partOneResult = partOne(input)
// console.timeEnd("Part One Time")
// console.log("Solution to part 1: ", partOneResult)

// console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")

export {}
