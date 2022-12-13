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
      let numHeight = charToNum(input[y][x])
      let start = false
      let end = false
      if (numHeight === -14) {
        numHeight = charToNum("a")
        start = true
      }
      if (numHeight === -28) {
        numHeight = charToNum("z")
        end = true
      }
      grid.set(`${x},${y}`, {
        x,
        y,
        height: numHeight,
        start,
        end,
        visited: false,
        distance: start ? 0 : Infinity,
      })
    }
  }
  return grid
}

function findEasiestPath(input: string[][]) {
  let steps = 0
  const grid = createGrid(input)
  const [[sx, sy], startNode] = Array.from(grid).find(
    ([key, value]) => value.start
  )
  const [[ex, ey], endNode] = Array.from(grid).find(([key, value]) => value.end)
  let current = startNode
  while (!endNode.visited) {
    console.log({ current })
    const neighbors = getNeighbors(current.x, current.y)
      .filter(([x, y]) => grid.has(`${x},${y}`))
      .map(([x, y]) => {
        return grid.get(`${x},${y}`)
      })
    for (let neighbor of neighbors) {
      console.log(neighbor)
    }
    endNode.visited = true
  }
  // console.log({ startNode, endNode })
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
