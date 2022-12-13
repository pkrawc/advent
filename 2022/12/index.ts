import { readInput, test, getNeighbors } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.split(""))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function charToNum(char) {
  return char.charCodeAt(0) - 97
}

interface GridNode {
  char: string
}

class Grid {
  nodes: Map<string, GridNode>
  adjacent: {}
  constructor() {
    this.nodes = new Map()
    this.adjacent = []
  }

  addNode(x: number, y: number, node: GridNode) {
    this.nodes.set(`${x},${y}`, node)
    this.adjacent[`${x},${y}`] = []
  }

  exists(a, b) {
    return Boolean(this.adjacent[a].find((i) => i.id === b.id))
  }

  addEdge(aCoord, bCoord, weight) {
    if (!this.exists(aCoord, bCoord)) {
      this.adjacent[aCoord].push({ id: bCoord, weight })
    }
    if (!this.exists(bCoord, aCoord)) {
      this.adjacent[bCoord].push({ id: aCoord, weight })
    }
  }
}

function createGrid(input: string[][]) {
  const grid = new Grid()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      let item = input[y][x]
      grid.addNode(x, y, { char: item })
    }
  }
  grid.nodes.forEach((value, key) => {
    const { char } = value
    const [x, y] = key.split(",").map(Number)
    const neighbors = getNeighbors(x, y).filter(([nx, ny]) =>
      grid.nodes.has(`${nx},${ny}`)
    )
    neighbors.forEach(([nx, ny]) => {
      const nKey = `${nx},${ny}`
      const { char: nChar } = grid.nodes.get(nKey)
      let weight
      if (char === "S") {
        weight = nChar.charCodeAt(0) - "a".charCodeAt(0)
      }
      if (char === "E") {
        weight = nChar.charCodeAt(0) - "z".charCodeAt(0)
      }
      weight = nChar.charCodeAt(0) - char.charCodeAt(0)
      grid.addEdge(key, nKey, weight)
    })
  })
  return grid
}

function findEasiestPath(input: string[][]) {
  const grid = createGrid(input)
  console.log(grid.adjacent)
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
