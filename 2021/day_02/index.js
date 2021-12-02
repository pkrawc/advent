const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.split(/\n/)

const input = prepareInput(readInput())

function partOne(input) {
  let distance = 0
  let depth = 0
  input.forEach((command) => {
    const [instruction, amount] = command.split(" ")
    switch (instruction) {
      case "forward":
        distance += parseInt(amount)
        break
      case "down":
        depth += parseInt(amount)
        break
      case "up":
        depth -= parseInt(amount)
        break
      default:
        throw Error(`Unknown instruction: ${instruction}`)
    }
  })
  return distance * depth
}

function partTwo(input) {
  let distance = 0
  let depth = 0
  let aim = 0
  input.forEach((command) => {
    const [instruction, amount] = command.split(" ")
    switch (instruction) {
      case "forward":
        distance += parseInt(amount)
        depth += parseInt(amount) * aim
        break
      case "down":
        aim += parseInt(amount)
        break
      case "up":
        aim -= parseInt(amount)
        break
      default:
        throw Error(`Unknown instruction: ${instruction}`)
    }
  })
  return distance * depth
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
