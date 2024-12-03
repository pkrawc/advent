import { readInput, sum, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input) {
  const results = []
  const instructions = input.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g)

  for (let group of instructions) {
    results.push(parseInt(group[1]) * parseInt(group[2]))
  }

  return sum(results)
}

function partTwo(input) {
  const results = []
  const instructions = input.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)|(do\(\))|(don't\(\))/g)
  let isDo = true

  for (let group of instructions) {
    switch (group[0]) {
      case "do()":
        isDo = true
        break;
    
      case "don't()":
        isDo = false
        break;
      default:
        if (isDo) {
          results.push(parseInt(group[1]) * parseInt(group[2]))
        }
        break;
    }
  }
  return sum(results)
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
