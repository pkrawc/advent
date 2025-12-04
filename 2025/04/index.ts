import { getNeighbors, readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((line) => line.split(""))
    .reduce((coords, row, y) => {
      for (let [x, char] of row.entries()) {
        coords.set(`${x},${y}`, char)
      }
      return coords
    }, new Map())

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input: Map<string, string>) {
  let accessibleRolls = 0
  for (let [coords, char] of input) {
    if (char === "@") {
      const [x, y] = coords.split(",").map(Number)
      const neighborRolls = getNeighbors(x, y)
        .map(([nx, ny]) => input.get(`${nx},${ny}`) ?? ".")
        .filter((nc) => nc === "@").length
      if (neighborRolls < 4) {
        accessibleRolls++
      }
    }
  }
  return accessibleRolls
}

function getRolls(grid: Map<string, string>): [number, Map<string, string>] {
  let accessibleRolls = 0
  const changedGrid = new Map(grid)
  for (let [coords, char] of grid) {
    if (char === "@") {
      const [x, y] = coords.split(",").map(Number)
      const neighborRolls = getNeighbors(x, y)
        .map(([nx, ny]) => grid.get(`${nx},${ny}`) ?? ".")
        .filter((nc) => nc === "@").length
      if (neighborRolls < 4) {
        accessibleRolls++
        changedGrid.set(coords, ".")
      }
    }
  }
  return [accessibleRolls, changedGrid]
}

function partTwo(input: Map<string, string>) {
  const firstRun = getRolls(input)
  let totalRolls = firstRun[0]
  let rolls = firstRun[0]
  let grid = new Map(firstRun[1])
  while (rolls > 0) {
    const [newRolls, newGrid] = getRolls(grid)
    rolls = newRolls
    grid = new Map(newGrid)
    totalRolls += newRolls
  }
  return totalRolls
}

/* Tests */

// const result = partOne(testInput)

// test(result, 13)

// const partTwoResult = partTwo(testInput)

// test(partTwoResult, 43)

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
