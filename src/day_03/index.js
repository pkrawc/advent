const { readInput, test } = require("../utils")

const rawTestInput = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`

const prepareInput = (rawInput) =>
  rawInput
    .trim()
    .split(/\n/)
    .map((line) => line.split(""))

const input = prepareInput(readInput())

function getArea(neededWidth, input) {
  const inputWidth = input[0].length
  return input.map((line) => {
    const repeat = neededWidth / inputWidth
    const newLine = []
    for (let i = 0; i <= repeat; i++) {
      newLine.push(...line)
    }
    return newLine
  })
}

function getTrees(slope, input) {
  const coords = {
    x: 0,
    y: 0,
    trees: 0,
  }
  const height = input.length
  const needed = Math.round((height / slope.y) * slope.x)
  const field = getArea(needed, input)
  while (coords.x < needed) {
    const { x, y } = coords
    const isTree = field[y][x] === "#"
    coords.x += slope.x
    coords.y += slope.y
    if (isTree) coords.trees++
  }
  return coords.trees
}

function partOne(input) {
  const trees = getTrees({ x: 3, y: 1 }, input)
  return trees
}

function partTwo(input) {
  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]
  const aggTrees = slopes.map((slope) => {
    return getTrees(slope, input)
  })

  return aggTrees.reduce((a, b) => a * b)
}

/* Tests */

const testInput = prepareInput(rawTestInput)

const testResult = partOne(testInput)

test(testResult, 7)

/* Results */

console.log(`-------------`)
console.time("Part One")
const partOneResult = partOne(input)
console.timeEnd("Part One")
console.log("Solution to part 1: ", partOneResult)
console.log(`-------------`)

console.log(`-------------`)
console.time("Part Two")
const partTwoResult = partTwo(input)
console.timeEnd("Part Two")

console.log("Solution to part 2: ", partTwoResult)
console.log(`-------------`)
