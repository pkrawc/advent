const { readInput, test } = require("../../utils")
const gen = require("generatorics")

const prepareInput = (rawInput) => rawInput.split(/\n/)

const input = prepareInput(readInput())

function findFailedNumber(input) {
  const list = input.map((i) => Number(i))
  const preamble = list.splice(0, 25)
  let index = 0
  let failedNumber = null
  while (index < list.length && !failedNumber) {
    const number = list[index]
    const setArr = []
    for ([a, b] of gen.combination(preamble, 2)) {
      setArr.push(a + b)
    }
    if (setArr.includes(number)) {
      index++
      preamble.shift()
      preamble.push(number)
      continue
    }
    failedNumber = number
  }
  return failedNumber
}

function partOne(input) {
  return findFailedNumber(input)
}

const sum = (arr) => arr.reduce((a, b) => a + b, 0)

function partTwo(input) {
  const failedNumber = findFailedNumber(input)
  const list = input.map((i) => Number(i))
  let weakness = null
  for (let idx in list) {
    for (let set = idx; set < list.length; set++) {
      if (set - idx > 1) {
        let contiguous = list.slice(idx, set)
        if (sum(contiguous) === failedNumber) {
          contiguous.sort((a, b) => a - b)
          weakness = contiguous[0] + contiguous[contiguous.length - 1]
          break
        }
        if (sum(contiguous) > failedNumber) break
      }
    }
  }
  return weakness
}

/* Tests */

// test(result, expected)

/* Results */

console.log("-----------------")

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")
console.log("Solution to part 1: ", partOneResult)

console.log("-----------------")

console.time("Part Two Time")
const partTwoResult = partTwo(input)
console.timeEnd("Part Two Time")
console.log("Solution to part 2: ", partTwoResult)

console.log("-----------------")
