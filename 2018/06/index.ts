import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

const buildGrid = (coords: [[number, number]]) => {
  const maxX = coords.reduce((max, [x]) => (x > max ? x : max), 0)
  const maxY = coords.reduce((max, [, y]) => (y > max ? y : max), 0)
  const grid = Array.from({ length: maxX + 1 }, () => {
    return Array.from({ length: maxY + 1 }, () => {
      return "."
    })
  })

  return grid
}

function partOne(input) {
  const coords = input.split("\n").map((line) => {
    const [x, y] = line.split(", ")
    return [parseInt(x), parseInt(y)]
  })
  const grid = buildGrid(coords)

  return input
}

function partTwo(input) {
  return input
}

/* Tests */

// test(result, expected)

/* Results */

const { log, time, timeEnd } = console

const success = chalk.bold.green
const timer = chalk.bold.blue
const seperator = chalk.bold.white("-----------------")

log(seperator)

time(timer("Part One Time"))
const partOneResult = partOne(testInput)
timeEnd(timer("Part One Time"))
log(success("Solution to part 1: ", partOneResult))

log(seperator)

// time(timer("Part Two Time"))
// const partTwoResult = partTwo(input)
// timeEnd(timer("Part Two Time"))
// log(success("Solution to part 2: ", partTwoResult))

// log(seperator)

export {}
