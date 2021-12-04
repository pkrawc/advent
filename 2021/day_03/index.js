const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) =>
  rawInput.split(/\n/).map((num) => num.split(""))

const input = prepareInput(readInput())

const getCommonMap = (array) => {
  const commonMap = [
    ...array.reduce(
      (map, item) => map.set(item, (map.get(item) || 0) + 1),
      new Map()
    ),
  ]
  return commonMap.sort((a, b) => b[1] - a[1]).map((i) => i[0])
}

function partOne(input, bitLength = 12) {
  const gammaNum = []
  const epsilonNum = []
  for (let i = 0; i < bitLength; i++) {
    const bitArray = []
    const bitDict = {}
    for (let x = 0; x < input.length; x++) {
      bitArray.push(input[x][i])
    }
    const [most, least] = getCommonMap(bitArray)
    gammaNum.push(most)
    epsilonNum.push(least)
  }
  const gamma = parseInt(gammaNum.join(""), 2)
  const epsilon = parseInt(epsilonNum.join(""), 2)
  return gamma * epsilon
}

function partTwo(oInput) {
  let idx = 0
  let input = oInput
  while (input.length > 2) {
    const bitArray = []
    for (let i = 0; i < input.length; i++) {
      bitArray.push(input[i][idx])
    }
    const [most] = getCommonMap(bitArray)
    input = input.filter((item) => item[idx] === most)
    idx++
  }
  const oxygen = parseInt(input.find((num) => num[idx] === "1").join(""), 2)
  idx = 0
  input = oInput
  while (input.length > 2) {
    const bitArray = []
    for (let i = 0; i < input.length; i++) {
      bitArray.push(input[i][idx])
    }
    const [_, least] = getCommonMap(bitArray)
    input = input.filter((item) => item[idx] === least)
    idx++
  }
  const carbonDioxide = parseInt(
    input.find((num) => num[idx] === "0").join(""),
    2
  )
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
