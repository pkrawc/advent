import { readInput, sum, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getHistory(current: number[], sequences?: number[][]) {
  if (!sequences) {
    sequences = []
  }
  if (current.every((n) => n === 0)) {
    return sequences
  }
}

function partOne(input) {
  const histories = []
  for (let value of input) {
    const sequence = value.split(" ").map((n) => parseInt(n))
    const history = getHistory(sequence)
    histories.push(history)
  }
  return sum(histories)
}

function partTwo(input) {
  return input
}

/* Tests */

const result = partOne(testInput)

test(result, 114)

/* Results */

const { log, time, timeEnd } = console

// const success = chalk.bold.green
// const timer = chalk.bold.blue
// const seperator = chalk.bold.white("-----------------")

// log(seperator)

// time(timer("Part One Time"))
// const partOneResult = partOne(input)
// timeEnd(timer("Part One Time"))
// log(success("Solution to part 1: ", partOneResult))

// log(seperator)

// time(timer("Part Two Time"))
// const partTwoResult = partTwo(input)
// timeEnd(timer("Part Two Time"))
// log(success("Solution to part 2: ", partTwoResult))

// log(seperator)

export {}
