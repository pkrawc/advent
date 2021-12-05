const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) =>
  rawInput.split(/\n/).map((num) => num.split(""))

const input = prepareInput(readInput())

// Logic pretty much stolen from Maddie.
const getBitFrequency = (array, idx) => {
  let zeros = 0
  let ones = 0
  array.forEach((item) => {
    if (item[idx] === "0") zeros++
    else ones++
  })
  return zeros > ones ? "0" : "1"
}

function partOne(input, bitLength = 12) {
  const gammaNum = []
  const epsilonNum = []
  for (let i = 0; i < bitLength; i++) {
    const most = getBitFrequency(input, i)
    gammaNum.push(most)
    epsilonNum.push(most === "1" ? "0" : "1")
  }
  const gamma = parseInt(gammaNum.join(""), 2)
  const epsilon = parseInt(epsilonNum.join(""), 2)
  return gamma * epsilon
}

function partTwo(oInput) {
  let idx = 0
  let input = oInput
  while (input.length > 1) {
    const most = getBitFrequency(input, idx)
    input = input.filter((item) => item[idx] === most)
    idx++
  }
  const oxygen = parseInt(input[0].join(""), 2)
  idx = 0
  input = oInput
  while (input.length > 1) {
    const most = getBitFrequency(input, idx)
    input = input.filter((item) => item[idx] !== most)
    idx++
  }
  const carbonDioxide = parseInt(input[0].join(""), 2)
  return oxygen * carbonDioxide
}

/* Tests */

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

test(partOne(prepareInput(testInput), 5), 198)

test(partTwo(prepareInput(testInput), 5), 230)

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
