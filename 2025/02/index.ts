import { readInput, test, sum } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput.split(",").map((x) => x.split("-").map(Number))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input) {
  const invalids = []
  for (let [start, end] of input) {
    for (let i = start; i <= end; i++) {
      const isInvalid = /^(\d+)\1$/.test(i.toString())
      if (isInvalid) invalids.push(i)
    }
  }
  return sum(invalids)
}

function partTwo(input) {
  const invalids = []
  for (let [start, end] of input) {
    for (let i = start; i <= end; i++) {
      const isInvalid = /^(\d+)\1+$/.test(i.toString())
      if (isInvalid) invalids.push(i)
    }
  }
  return sum(invalids)
}

/* Tests */

test(partOne(testInput), 1227775554)

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
