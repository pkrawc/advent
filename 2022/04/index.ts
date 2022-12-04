import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((line) =>
      line
        .split(",")
        .map((range) => range.split("-").map((num) => parseInt(num)))
    )

const input = prepareInput(readInput())

function partOne(input) {
  let contains = 0
  for (let pair of input) {
    const [start1, end1] = pair[0]
    const [start2, end2] = pair[1]
    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1)
    )
      contains++
  }
  return contains
}

function partTwo(input) {
  let overlaps = 0
  for (let pair of input) {
    const [start1, end1] = pair[0]
    const [start2, end2] = pair[1]
    // if (start1 <= start2 && end1 >= end2) includes++
    // else if (start2 <= start1 && end2 >= end1) includes++
    if (
      (start1 >= start2 && start1 <= end2) ||
      (start2 >= start1 && start2 <= end1)
    ) {
      overlaps++
    }
  }
  return overlaps
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
