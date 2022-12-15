import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) =>
    line.split(": ").map((s) => {
      return s.match(/(\d+)/g)
    })
  )

// const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function mapSensors(input) {
  console.log(input)
  return input
}

function partOne(input) {
  const sensorMap = mapSensors(input)
  return sensorMap
}

function partTwo(input) {
  return input
}

/* Tests */

const partOneTest = partOne(testInput)

test(partOneTest, 0)

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
