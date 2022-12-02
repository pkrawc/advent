const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.split(/\n/)

const input = prepareInput(readInput())

function getCell(grid, y, x) {
  let cell = null
  const hasValue = grid?.[y]?.[x]
  if (hasValue) {
    cell = { value: parseInt(grid[y][x]), x, y }
  }
  return cell
}

function getNeighbors(grid, x, y) {
  const neighbors = new Map()
  const neighborsLookup = [
    ["N", [x, y - 1]],
    ["E", [x + 1, y]],
    ["W", [x - 1, y]],
    ["S", [x, y + 1]],
  ]
  if (!grid[y][x]) return neighbors
  for (let [direction, coords] of neighborsLookup) {
    let [cx, cy] = coords
    if (grid?.[cy]?.[cx]) neighbors.set(direction, getCell(grid, cy, cx))
  }
  return neighbors
}

function getLowPoints(grid) {
  const lowPoints = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = getCell(grid, y, x)
      const neighbors = getNeighbors(grid, x, y)
      const isLowPoint = Array.from(neighbors).every((adjCell) => {
        if (!adjCell) return true
        return adjCell.value > cell.value
      })
      if (isLowPoint) lowPoints.push(cell)
    }
  }
  return lowPoints
}

function buildGrid(input) {
  return Array.from(Array(input.length), (item, idx) => input[idx].split(""))
}

function partOne(input) {
  const grid = buildGrid(input)
  const lowPoints = getLowPoints(grid)
  return lowPoints.reduce(
    (riskLevel, point) => (riskLevel += point.value + 1),
    0
  )
}

function partTwo(input) {
  const grid = buildGrid(input)
  const lowPoints = getLowPoints(grid)
  const basins = []
  for (let point of lowPoints) {
    const queue = [point]
    const visited = new Set()
    visited.add(`${point.x},${point.y}`)
    while (queue.length > 0) {
      const cell = queue.shift()
      const adjacent = getNeighbors(grid, cell.x, cell.y)
      for ([key, adjCell] of adjacent) {
        const id = `${adjCell.x},${adjCell.y}`
        if (value < 9 && !visited.has(id)) {
          queue.push(adjCell)
          visited.add(id)
        }
      }
    }
    basins.push(visited)
  }
  return basins.sort((a, b) => b.size - a.size)
}

/* Tests */

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`

const result = partOne(prepareInput(testInput))

test(result, 15)

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
