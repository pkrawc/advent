const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.trim().split(/\n/)

const input = prepareInput(readInput())

function getCharCount(char, string) {
  return (string.match(new RegExp(char, "g")) || []).length
}

function partOne(arr) {
  const count = arr.reduce((passed, input) => {
    const [lowest, highest, char, password] = input.split(/\-|\s/)
    const letter = char[0]
    const charCount = getCharCount(letter, password)
    if (charCount > highest || charCount < lowest) return passed
    return ++passed
  }, 0)
  return count
}

function partTwo(arr) {
  const count = arr.reduce((passed, input) => {
    const [lowest, highest, char, password] = input.split(/\-|\s/)
    const letter = char[0]
    const firstValid = password[lowest - 1] === letter
    const secondValid = password[highest - 1] === letter
    if (firstValid && secondValid) return passed
    if (firstValid || secondValid) return ++passed
    return passed
  }, 0)
  return count
}

/* Tests */

// test(result, expected)

/* Results */

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")

console.time("Part Two Time")
const partTwoResult = partTwo(input)
console.timeEnd("Part Two Time")

console.log("Solution to part 1: ", partOneResult)
console.log("Solution to part 2: ", partTwoResult)
