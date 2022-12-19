import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split("")

const rockShapes = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
]

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function createBoard(width: number) {}

function partOne(input) {
  let idx = 0
  let towerHeight = 0
  const towerWidth = 7
  const board = createBoard(7)
  while (idx < 2022) {
    const rock = rockShapes[idx % rockShapes.length]
    const jet = input[idx % input.length]
    console.log({ rock, jet })
    idx++
  }
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const result = partOne(testInput)

test(result, 3068)

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
