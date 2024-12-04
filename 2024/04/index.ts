import { getNeighbors, readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput.split(/\n/).map(row => row.split("")).reduce((coords, row, y) => {
  for (let [x, char] of row.entries()) {
    coords.set(`${x},${y}`, char)
  }
  return coords
},new Map())

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function findWords(grid: Map<string, string>, shapes: number[][][], spellings: string[]) {
  let wordCount = 0
  for (let [coords] of grid) {
    const [x,y] = coords.split(",").map(c => parseInt(c))
    for (let shape of shapes) {
      const word = shape.reduce((string, [dx, dy]) => {
        const letter = grid.get(`${x + dx},${y + dy}`)
        if (letter) {
          return string.concat(letter)
        } else {
          return string
        }
      }, "")
      if (spellings.some(spelling => spelling === word)) {
        wordCount++
      }
    }
  }
  return wordCount
}

const firstShapes = [
  [[0,0], [1,0], [2,0], [3,0]],
  [[0,0], [0,1], [0,2], [0,3]],
  [[0,0], [1,1], [2,2], [3,3]],
  [[0,3], [1,2], [2,1], [3,0]]
]

const secondShapes = [
  [[0,0], [1,1], [2,2], [0,2], [1,1], [2,0]]
]

function partOne(input) {
  return findWords(input, firstShapes, ["XMAS", "SAMX"])
}

function partTwo(input) {
  return findWords(input, secondShapes, ["MASMAS", "SAMSAM", "MASSAM", "SAMMAS"])
}

/* Tests */

const result = partOne(testInput)

test(result, 18)

/* Results */

const { log, time, timeEnd } = console

const success = chalk.bold.green
const timer = chalk.bold.blue
const seperator = chalk.bold.white("-----------------")

log(seperator)

time(timer("Part One Time"))
const partOneResult = partOne(input)
timeEnd(timer("Part One Time"))
log(success("Solution to part 1: ", partOneResult))

log(seperator)

time(timer("Part Two Time"))
const partTwoResult = partTwo(input)
timeEnd(timer("Part Two Time"))
log(success("Solution to part 2: ", partTwoResult))

log(seperator)

export {}
