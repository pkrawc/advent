import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((string) => {
    const regex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./
    const matchGroups = regex.exec(string)
    return [matchGroups[1], matchGroups[2]]
  })

const input = prepareInput(readInput())

// Step M must be finished before step G can begin

// function buildTree(input: string[][]) {
//   return input.reduce((acc, curr) => {
//     return acc[a] =
//   }, {})
// }

function sortSteps(input) {
  let steps = new Set(
    input.flatMap((char: string) => ({ node: char, parentNode: null }))
  )

  return steps
}

function partOne(input) {
  const result = sortSteps(input)
  return result
}

function partTwo(input) {
  const result = sortSteps(input)
  return result
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
