import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n/).map(Number)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input: number[]) {
  const file = input.map((n) => n)
  const buffer = [...file]
  for (const num of file) {
    const idx = buffer.indexOf(num)
    buffer.splice(idx, 1)
    buffer.splice((idx + num) % buffer.length, 0, num)
  }
  const zero = buffer.indexOf(0)
  return [1000, 2000, 3000].reduce(
    (acc, curr) => acc + buffer[(curr + zero) % buffer.length],
    0
  )
}

function partTwo(input) {
  return input
}

/* Tests */

const result = partOne(testInput)

test(result, 3)

/* Results */

console.log("-----------------")

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")
console.log("Solution to part 1: ", partOneResult)

console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")

export {}
