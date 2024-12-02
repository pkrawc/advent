import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function checkLevels(report) {
  let isSafe = true
  const increasing = report[0] < report[1]
  for (const [idx, curr] of report.entries()) {

    const next = report[idx + 1]
    if (!next) break
    const dist = Math.abs(curr - next)
    // check for distance
    if (!(dist > 0 && dist < 4)) {
      isSafe = false
      break
    }
    // check to see if each increases if the beginning does.
    if ((increasing && curr > next) || (!increasing && curr < next)) {
      isSafe = false
      break
    }
  }
  return isSafe
}

function partOne(input) {
  const reports = input.map(r => r.split(" ").map(n => parseInt(n)))
  let totalCount = 0
  for (let report of reports) {
    const isSafe = checkLevels(report)
    if (isSafe) {
      totalCount++
      continue
    }
  }
  return totalCount
}

function partTwo(input) {
  const reports = input.map(r => r.split(" ").map(n => parseInt(n)))
  let totalCount = 0
  for (let report of reports) {
    const isSafe = checkLevels(report)
    if (isSafe) {
      totalCount++
      continue
    }
    for (let [idx] of report.entries()) {
        const newReport = report.toSpliced(idx, 1)
        const alsoSafe = checkLevels(newReport)
        if (alsoSafe) {
          totalCount++
          break
        }
      }
  }
  return totalCount
}

/* Tests */

// test(partOne(testInput), 2)

// test(partTwo(testInput), 4)

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
