import { readFileSync } from "fs"
import { dequal } from "dequal"
import getCallerFile from "get-caller-file"
import chalk from "chalk"

/**
 * Assumes that the file you're calling is right next to the file you're calling from.
 */
export function readInput(filename: string = "input.txt") {
  const file = getCallerFile()
    .split("/")
    .slice(0, -1)
    .concat(filename)
    .join("/")
  return readFileSync(file).toString()
}

let index = 0

const success = chalk.bold.green
const error = chalk.bold.red
const log = console.log

export function test(input: any, expected: typeof input) {
  const passed = dequal(input, expected)

  if (passed) {
    log(success(`${index}: passed`))
  } else {
    log(error(`-------------`))
    log(error(`${index}: failed`))
    log(`expected: `, expected)
    log(`receieved: `, input)
    log(error(`-------------`))
  }
  index++
}

export function getNeighbors(x: number, y: number) {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
}

export function sum(numbers: number[]) {
  return numbers.reduce((acc, curr) => acc + curr, 0)
}
