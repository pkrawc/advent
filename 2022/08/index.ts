import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split("\n")

const input = prepareInput(readInput())

function buildTreeGrid(input) {
  const grid = new Map<string, { height: number; visible: boolean | null }>()

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      grid.set(`${x},${y}`, { height: parseInt(input[y][x]), visible: null })
    }
  }
  // [grid, height, width]
  return grid
}

// function checkVisible(cell, grid) {
//   const [coors, {height: treeHeight}] = cell

// }

function partOne(input) {
  const grid = buildTreeGrid(input)
  const height = input.length
  const width: number = input[0].length
  for (let [coords, { height: treeHeight }] of grid.entries()) {
    const [x, y] = coords.split(",").map((n) => parseInt(n))
    const lines = {
      n: [],
      e: [],
      w: [],
      s: [],
    }
    // Right
    for (let h = x + 1; h < width - x; h++) {
      const rightTree = grid.get(`${h},${y}`)
      lines.e.push(rightTree.height)
    }
    // Left
    for (let h = x - 1; h >= 0; h--) {
      const leftTree = grid.get(`${h},${y}`)
      lines.w.push(leftTree.height)
    }
    // Top
    for (let v = y - 1; v >= 0; v--) {
      const topTree = grid.get(`${x},${v}`)
      lines.n.push(topTree.height)
    }
    // Bottom
    for (let v = y + 1; v < height - y; v++) {
      const bottomTree = grid.get(`${x},${v}`)
      lines.s.push(bottomTree.height)
    }
    const visible = Object.values(lines)
      .map((line) => {
        return line.every((h) => h < treeHeight)
      })
      .some((v) => v)
    grid.set(`${x},${y}`, { ...grid.get(`${x},${y}`), visible })
  }
  return Array.from(grid.values())
}

// function partTwo(input) {
//   return input
// }

/* Tests */

// test(result, expected)

/* Results */

console.log("-----------------")

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")
console.log("Solution to part 1: ", partOneResult)

console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")

export {}
