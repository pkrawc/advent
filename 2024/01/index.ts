import { readInput, sum, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input) {
  // Split the input into two lists by column, then sort the lists by size, then take each pair and figure out the difference between them.
  const listNums = input.split(/\n/)
  const listOne = []
  const listTwo = []
  const diffs = []
  for (const item of listNums) {
    const [one, two] = item.split("  ")
    listOne.push(parseInt(one))
    listTwo.push(parseInt(two))
  }
  listOne.sort()
  listTwo.sort()
  for (const idx in listOne) {
    const oneNum = listOne[idx]
    const twoNum = listTwo[idx]

    diffs.push(Math.abs(oneNum - twoNum))
  }
  return sum(diffs)
}

function partTwo(input) {
  const listNums = input.split(/\n/)
  const listOne = []
  const listTwo = []
  const simScore = new Map<number, number>()
  const scores = []
  for (const item of listNums) {
    const [one, two] = item.split("  ")
    listOne.push(parseInt(one))
    listTwo.push(parseInt(two))
  }
  for (const idx in listOne) {
    const numOne = listOne[idx]
    if (simScore.has(numOne)) {
      scores.push(simScore.get(numOne))
    } else {
      const count = listTwo.filter(numTwo => numTwo === numOne).length
      simScore.set(numOne, count * numOne)
      scores.push(simScore.get(numOne))
    }
  }
  return sum(scores)
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
