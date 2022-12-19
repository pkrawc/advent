import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

// const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function parseBluePrints(input) {
  return input.map((line) => {
    // const [id, ore, clayBit, obsidianBit, geodeBit] =
    //   line.split(/:\s|\.\s/)
    // const [id] = idBit.match(/(\d+)/g)
    // const [ore] = oreBit.match(/(\d+)/g)
    // return { id, ore }
  })
}

function partOne(input) {
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const result = parseBluePrints(testInput)

console.log(result)

// test(result, expected)

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
