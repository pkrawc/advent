const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.split(/\n/)

const input = prepareInput(readInput())

function getSeats(input) {
  return input
    .map((line) => {
      const fb = line.substring(0, 7)
      const lr = line.substring(7)
      const row = parseInt(fb.replace(/F/g, "0").replace(/B/g, "1"), 2)
      const seat = parseInt(lr.replace(/L/g, "0").replace(/R/g, "1"), 2)
      return row * 8 + seat
    })
    .sort((a, b) => b - a)
}

function partOne(input) {
  const seats = getSeats(input)
  return seats[0]
}

function partTwo(input) {
  const seatIds = getSeats(input)
  return seatIds.find((val, idx, arr) => idx && arr[idx - 1] - val > 1) + 1
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
