const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.split(",").map((p) => parseInt(p))

const input = prepareInput(readInput())

function getBestPosition(input, linear = true) {
  const fuelConsumption = []
  const sortedPositions = input.sort((a, b) => b - a)
  for (let i = 0; i < sortedPositions[0]; i++) {
    const positionConsumption = sortedPositions.reduce((total, pos) => {
      const linearDistance = Math.abs(i - pos)
      const fuelNeeded = (linearDistance * (linearDistance + 1)) / 2
      return (total += linear ? linearDistance : fuelNeeded)
    }, 0)
    fuelConsumption.push(positionConsumption)
  }
  return fuelConsumption.sort((a, b) => a - b)[0]
}

function partOne(input) {
  const bestPosition = getBestPosition(input)
  return bestPosition
}

function partTwo(input) {
  const bestPosition = getBestPosition(input, false)
  return bestPosition
}

/* Tests */

const testInput = `16,1,2,0,4,2,7,1,2,14`

const result = partOne(prepareInput(testInput))

test(result, 37)

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
