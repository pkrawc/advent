import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => (line[0] === "L" ? -1 : 1) * parseInt(line.slice(1)))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function findSafeCombo(input: number[]) {
  let pointer = 50
  const combos = []
  let zeroHits = 0
  for (let instruction of input) {
    const turn = instruction % 100
    const add = pointer === 0 ? 0 : 1
    pointer += turn
    if (pointer < 0) {
      pointer = 100 + pointer
      zeroHits += add
    } else if (pointer > 99) {
      pointer = pointer - 100
      zeroHits += add
    } else if (pointer === 0) {
      zeroHits += add
    }

    zeroHits += Math.floor(Math.abs(instruction) / 100)
    combos.push(pointer)
  }
  return { zeroHits, zeroCombos: combos.filter((combo) => combo === 0).length }
}

function partOne(input) {
  const combo = findSafeCombo(input)
  return combo.zeroCombos
}

function partTwo(input) {
  const { zeroHits } = findSafeCombo(input)
  return zeroHits
}

/* Tests */

test(findSafeCombo(testInput).zeroCombos, 3)
test(findSafeCombo(testInput).zeroHits, 6)

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
