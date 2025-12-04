import { readInput, sum, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((l) => l.split("").map(Number))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getLargestIdx(input: number[]) {
  let largest = -1
  let idx = -1

  for (let [i, digit] of input.entries()) {
    if (digit > largest) {
      largest = digit
      idx = i
    }
  }
  return idx
}

function getMaxJoltage(bank: number[], onCount: number = 2) {
  while (onCount > 1) {
    const nextOnCount = onCount - 1
    const searchableBattries = bank.slice(0, bank.length - nextOnCount)
    const batteryIdx = getLargestIdx(searchableBattries)
    const nextBank = bank.slice(batteryIdx + 1)

    return parseInt(
      `${bank[batteryIdx]}${getMaxJoltage(nextBank, nextOnCount)}`
    )
  }
  return bank[getLargestIdx(bank)]
}

function partOne(input) {
  let highestJoltages = []
  for (let bank of input) {
    highestJoltages.push(getMaxJoltage(bank, 2))
  }
  return sum(highestJoltages)
}

function partTwo(input) {
  let highestJoltages = []
  for (let bank of input) {
    highestJoltages.push(getMaxJoltage(bank, 12))
  }
  return sum(highestJoltages)
}

/* Tests */

test(partOne(testInput), 357)

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
