import { readInput, test, getNeighbors } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.split(""))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function charToNum(char) {
  return char.charCodeAt(0) - 97
}

function createGrid(input: string[][]) {
  const grid = new Map()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      grid.set([x, y], { height: charToNum(input[y][x]) })
    }
  }
  // grid.forEach((value, [x, y], map) => {
  //   const neighbors = getNeighbors(x, y)
  //   for ()
  // })
  return grid
}

function findEasiestPath(input: string[][]) {
  let steps = 0
  const grid = createGrid(input)
  console.log(grid)
  return steps
}

function partOne(input) {
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const result = findEasiestPath(testInput)

test(result, 31)

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
