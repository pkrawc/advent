import { readInput, sum, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.match(/\d+/g).map((n) => parseInt(n)))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getOptimalBoatSpeed(input) {
  const [times, records] = input
  const waysToWin = []
  for (let [idx, time] of times.entries()) {
    const record = records[idx]
    const distances = []
    for (let ms = 0; ms < time; ms++) {
      const distance = ms * (time - ms)
      distances.push(distance)
    }
    waysToWin.push(distances.filter((d) => d > record).length)
  }
  return waysToWin.reduce((acc, curr) => acc * curr, 1)
}

function partOne(input) {
  return getOptimalBoatSpeed(input)
}

function partTwo(input) {
  const [times, records] = input
  const time = times.join("")
  const record = records.join("")
  const waysToWin = getOptimalBoatSpeed([[parseInt(time)], [parseInt(record)]])
  return waysToWin
}

/* Tests */

// const result = partTwo(testInput)

// test(result, 71503)

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
