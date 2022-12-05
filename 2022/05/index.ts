import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n\n/)

const input = prepareInput(readInput())

// [C]         [S] [H]
// [F] [B]     [C] [S]     [W]
// [B] [W]     [W] [M] [S] [B]
// [L] [H] [G] [L] [P] [F] [Q]
// [D] [P] [J] [F] [T] [G] [M] [T]
// [P] [G] [B] [N] [L] [W] [P] [W] [R]
// [Z] [V] [W] [J] [J] [C] [T] [S] [C]
// [S] [N] [F] [G] [W] [B] [H] [F] [N]
//  1   2   3   4   5   6   7   8   9

const stacks = new Map([
  [1, ["S", "Z", "P", "D", "L", "B", "F", "C"]],
  [2, ["N", "V", "G", "P", "H", "W", "B"]],
  [3, ["F", "W", "B", "J", "G"]],
  [4, ["G", "J", "N", "F", "L", "W", "C", "S"]],
  [5, ["W", "J", "L", "T", "P", "M", "S", "H"]],
  [6, ["B", "C", "W", "G", "F", "S"]],
  [7, ["H", "T", "P", "M", "Q", "B", "W"]],
  [8, ["F", "S", "W", "T"]],
  [9, ["N", "C", "R"]],
])

function rearrange(input: string[]) {
  const [start, insString] = input
  const instructions = insString.split(/\n/)
  let result = ""

  for (let instruction of instructions) {
    const [itemCount, movement] = instruction.split(" from ")
    const [from, to] = movement.split(" to ")
    for (let i = 0; 0 < parseInt(itemCount); i++) {}
  }
  stacks.forEach((stack: string[]) => {
    result += stack.pop()
  })
  return result
}

function partOne(input) {
  const rearraged = rearrange(input)
  return rearraged
}

function partTwo(input) {
  return input
}

/* Tests */

// [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2

// const testInput = `    [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2`

// test(rearrange(prepareInput(testInput)), "CMZ")

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
