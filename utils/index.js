const { readFileSync } = require("fs")
const { dequal } = require("dequal")
const getCallerFile = require("get-caller-file")

function readInput() {
  const file = getCallerFile()
    .split("/")
    .slice(0, -1)
    .concat("input.txt")
    .join("/")
  return readFileSync(file).toString()
}

let index = 0

function test(input, expected) {
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

module.exports = { readInput, test }
