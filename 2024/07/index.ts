import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) =>
    line.split(": ").reduce((eq, part, i) => {
      return i === 0
        ? { ...eq, solution: parseInt(part) }
        : { ...eq, values: part.split(" ").map((n) => parseInt(n)) }
    }, {})
  )

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getOperatorPermutations<T>(length: number, chars: T[]): T[] {
  const result = []
  function run(n, curr) {
    if (n === length - 1) return result.push(curr)
    for (let x = 0; x < chars.length; x++) run(n + 1, curr + chars[x])
  }
  run(0, "")
  return result
}

function partOne(input) {
  let result = 0
  for (let { solution, values } of input) {
    // 10 + 19, 10 * 19
    // 81 + 40 + 27, 81 * 40 + 27, 81 + 40 * 27, 81 * 40 * 27
    // 6 + 8 + 6 + 15, 6 * 8 + 6 + 15, 6 + 8 * 6 + 15, 6 + 8 + 6 * 15, ...
    // + + +, * + +, + * + ...
    const permutations = getOperatorPermutations(values.length, ["+", "*"])
    for (let permutation of permutations) {
      let sum = values[0]
      for (let i = 1; i < values.length; i++) {
        sum = permutation[i - 1] === "+" ? sum + values[i] : sum * values[i]
      }
      if (sum === solution) {
        result += sum
        break
      }
    }
  }
  return result
}

function partTwo(input) {
  let result = 0
  for (let { solution, values } of input) {
    const permutations = getOperatorPermutations(values.length, ["+", "*", "|"])
    for (let permutation of permutations) {
      let sum = values[0]
      for (let i = 1; i < values.length; i++) {
        const operator = permutation[i - 1]
        sum =
          operator === "+"
            ? sum + values[i]
            : operator === "*"
              ? sum * values[i]
              : parseInt(`${sum}${values[i]}`)
      }
      if (sum === solution) {
        result += sum
        break
      }
    }
  }
  return result
}

/* Tests */

const partOneRes = partOne(testInput)

test(partOneRes, 3749)

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
