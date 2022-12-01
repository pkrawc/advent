import { readFileSync } from "fs"
import { dequal } from "dequal"
import getCallerFile from "get-caller-file"

/**
 * Assumes that the file you're calling is right next to the file you're calling from.
 *
 * @param {string} filename
 * @returns File contents as a string
 */
export function readInput(filename = "input.txt") {
  const file = getCallerFile()
    .split("/")
    .slice(0, -1)
    .concat(filename)
    .join("/")
  return readFileSync(file).toString()
}

let index = 0

export function test(input, expected) {
  const passed = dequal(input, expected)

  if (passed) {
    console.log(`${index}: passed`)
  } else {
    console.log(`-------------`)
    console.log(`${index}: failed`)
    console.log(`expected: ${expected}`)
    console.log(`receieved: ${input}`)
    console.log(`-------------`)
  }
  index++
}
