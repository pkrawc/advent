import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input) {
  const lines = [...input]
  const [operatorsLine] = lines.splice(input.length - 1)
  const operators: string[] = [operatorsLine[0]]
  const problems: string[][] = []
  let offset = 0
  for (let i = 1; i < operatorsLine.length + 1; i++) {
    if (operatorsLine[i] === " ") continue
    if (i < operatorsLine.length) {
      operators.push(operatorsLine[i])
    }
    problems.push(
      lines.map((l) =>
        l.slice(offset, i < operatorsLine.length ? i - 1 : operatorsLine.length)
      )
    )
    offset = i
  }
  let total = 0
  for (let [oIdx, operator] of operators.entries()) {
    const problem = problems[oIdx]
      .map((c) => parseInt(c))
      .reduce((a, n) => (operator === "*" ? a * n : a + n))
    total += problem
  }
  return total
}

function partTwo(input) {
  const lines = [...input]
  const [operatorsLine] = lines.splice(input.length - 1)
  const operators: string[] = [operatorsLine[0]]
  const problems: string[][] = []
  let offset = 0
  for (let i = 1; i < operatorsLine.length + 1; i++) {
    if (operatorsLine[i] === " ") continue
    if (i < operatorsLine.length) {
      operators.push(operatorsLine[i])
    }
    problems.push(
      lines.map((l) =>
        l.slice(offset, i < operatorsLine.length ? i - 1 : operatorsLine.length)
      )
    )
    offset = i
  }
  let total = 0
  // console.log({ operators, problems })
  for (let [oIdx, operator] of operators.entries()) {
    const problem = problems[oIdx]
    const columns = problem[0].length
    const squidNums = []
    for (let i = 0; i < columns; i++) {
      const num = parseInt(problem.map((n) => n[i]).join(""))
      squidNums.push(num)
    }
    total += squidNums.reduce((a, c) => (operator === "*" ? a * c : a + c))
  }
  return total
}

/* Tests */

const partOneTest = partOne(testInput)
const partTwoTest = partTwo(testInput)

// test(partOneTest, 4277556)
test(partTwoTest, 3263827)

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
