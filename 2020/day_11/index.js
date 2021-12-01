const { readInput, test } = require("../../utils")
const { dequal } = require("dequal")
const { fileURLToPath } = require("url")

const prepareInput = (rawInput) => rawInput.trim().split(/\n/)

const rawTestInput = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`

const input = prepareInput(readInput())

const testInput = prepareInput(rawTestInput)

function checkAdjacent(row, col, currentGen) {
  let count = 0
  const isFilled = (row, col) => (currentGen[`${row}_${col}`] === "#" ? 1 : 0)
  const neighbors = {
    tl: isFilled(row - 1, col - 1),
    tc: isFilled(row - 1, col),
    tr: isFilled(row - 1, col + 1),
    l: isFilled(row, col - 1),
    r: isFilled(row, col + 1),
    br: isFilled(row + 1, col - 1),
    bc: isFilled(row + 1, col),
    bl: isFilled(row + 1, col + 1),
  }
  for (cell in neighbors) {
    count += neighbors[cell]
  }
  return count
}

function findSeats(input) {
  let genCount = 0
  let changes = true
  let currentGen = input.reduce((acc, row, rowIdx) => {
    const rowCells = {}
    row.split("").forEach((cell, cellIdx) => {
      rowCells[`${rowIdx}_${cellIdx}`] = cell
    })
    return { ...acc, ...rowCells }
  }, {})

  while (changes) {
    const nextGen = {}
    for ([key, value] of Object.entries(currentGen)) {
      const [row, col] = key.split("_")
      const filled = checkAdjacent(parseInt(row), parseInt(col), currentGen)
      if (value === "L" && !filled) nextGen[`${row}_${col}`] = "#"
      else if (value === "#" && filled > 5) nextGen[`${row}_${col}`] = "L"
      else nextGen[`${row}_${col}`] = value
    }
    if (dequal(currentGen, nextGen)) changes = false
    currentGen = nextGen
    genCount++
  }
  return Object.values(currentGen).reduce((count, value) => {
    if (value === "#") return ++count
    return count
  }, 0)
}

function partOne(input) {
  const seatCount = findSeats(input)
  return seatCount
}

function checkDirections(row, col, currentGen) {
  let count = 0
  const directions = {
    up: -1,
    down: +1,
    left: -1,
    right: +1,
  }

  return count
}

function partTwo(input) {
  let changes = true
  let currentGen = input.reduce((acc, row, rowIdx) => {
    const rowCells = {}
    row.split("").forEach((cell, cellIdx) => {
      rowCells[`${rowIdx}_${cellIdx}`] = cell
    })
    return { ...acc, ...rowCells }
  }, {})
  while (changes) {
    const nextGen = {}
    for ([key, value] in Object.entries(currentGen)) {
      const [row, col] = key.split("_")
      const filled = checkDirections(row, col, currentGen)
      if (value === "L" && !filled) nextGen[`${row}_${col}`] = "#"
      else if (value === "#" && filled > 4) nextGen[`${row}_${col}`] = "L"
      else nextGen[`${row}_${col}`] = value
    }
    changes = false
  }
  return currentGen
}

/* Tests */

const result = partTwo(testInput)

test(result, 37)

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
