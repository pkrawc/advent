const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) =>
  rawInput.split(/\n/).map((line) => {
    const [start, end] = line.split(" -> ")
    return {
      start: start.split(",").map((i) => parseInt(i)),
      end: end.split(",").map((i) => parseInt(i)),
    }
  })

const input = prepareInput(readInput())

function partOne(input) {
  const grid = Array.from(Array(1000), () => Array(1000).fill(0))
  for (let {
    start: [startX, startY],
    end: [endX, endY],
  } of input) {
    if (startX !== endX && startY !== endY) continue
    let x = startX
    let y = startY
    while (x !== endX || y !== endY) {
      grid[y][x]++
      x += startX < endX ? 1 : startX > endX ? -1 : 0
      y += startY < endY ? 1 : startY > endY ? -1 : 0
    }
    grid[y][x]++
  }

  let intersections = 0

  for (const row of grid) {
    for (const cell of row) {
      if (cell > 1) intersections++
    }
  }
  return intersections
}

function partTwo(input) {
  const grid = Array.from(Array(1000), () => Array(1000).fill(0))
  for (let {
    start: [startX, startY],
    end: [endX, endY],
  } of input) {
    let x = startX
    let y = startY
    while (x !== endX || y !== endY) {
      grid[y][x]++
      x += startX < endX ? 1 : startX > endX ? -1 : 0
      y += startY < endY ? 1 : startY > endY ? -1 : 0
    }
    grid[y][x]++
  }

  let intersections = 0

  for (const row of grid) {
    for (const cell of row) {
      if (cell > 1) intersections++
    }
  }
  return intersections
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
