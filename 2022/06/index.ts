import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split("")

const input = prepareInput(readInput())

function findMarker(chars: string[], markerLength: number) {
  let step = markerLength
  let marker = false
  while (!marker) {
    const test = new Set(chars.slice(step - markerLength, step))
    if (test.size === markerLength) {
      marker = true
      break
    }
    step++
  }
  return step
}

function partOne(input) {
  const stepCount = findMarker(input, 4)
  return stepCount
}

function partTwo(input) {
  const stepCount = findMarker(input, 14)
  return stepCount
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
