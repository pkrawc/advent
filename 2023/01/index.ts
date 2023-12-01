import { readInput, test } from "@utils"
import chalk from "chalk"
import { parse } from "path"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input: string) {
  const calibrationValues = input.split("\n").map((x) => {
    const digits = x
      .match(/(\d)+/g)
      .map((d) => d.split(""))
      .flat()
    return parseInt(`${digits[0]}${digits[digits.length - 1]}]}`)
  })

  return calibrationValues.reduce((a, b) => a + b, 0)
}

function partTwo(input: string) {
  const numMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }
  const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g
  const calibrationValues = input.split("\n").map((x) => {
    const digits = [...x.matchAll(regex)]
      .map((d) => d[1])
      .map((d) => (isNaN(parseInt(d)) ? numMap[d] : parseInt(d)))
    console.log({ digits })
    return parseInt(`${digits[0]}${digits[digits.length - 1]}]}`)
  })

  return calibrationValues.reduce((a, b) => a + b, 0)
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
