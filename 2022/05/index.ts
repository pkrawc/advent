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

function rearrange9000(input: string[], stacks) {
  const [start, insString] = input
  const instructions = insString.split(/\n/)
  let result = ""

  for (let instruction of instructions) {
    const [countMatch, from, to] = instruction.matchAll(/\d+/g)
    const count = parseInt(countMatch[0])
    const fromStack = stacks[parseInt(from[0]) - 1]
    const toStack = stacks[parseInt(to[0]) - 1]
    for (let i = 0; i < count; i++) {
      const item = fromStack.pop()
      toStack.push(item)
    }
  }
  stacks.forEach((stack: string[]) => {
    result += stack.pop()
  })
  return result
}

function rearrange9001(input: string[], stacks) {
  const [start, insString] = input
  const instructions = insString.split(/\n/)
  let result = ""

  for (let instruction of instructions) {
    const [countMatch, from, to] = instruction.matchAll(/\d+/g)
    const items = []
    const count = parseInt(countMatch[0])
    const fromStack = stacks[parseInt(from[0]) - 1]
    const toStack = stacks[parseInt(to[0]) - 1]
    for (let i = 0; i < count; i++) {
      const item = fromStack.pop()
      items.push(item)
    }
    toStack.push(...items.reverse())
  }
  stacks.forEach((stack: string[]) => {
    result += stack.pop()
  })
  return result
}

function partOne(input) {
  const stacks = [
    ["S", "Z", "P", "D", "L", "B", "F", "C"],
    ["N", "V", "G", "P", "H", "W", "B"],
    ["F", "W", "B", "J", "G"],
    ["G", "J", "N", "F", "L", "W", "C", "S"],
    ["W", "J", "L", "T", "P", "M", "S", "H"],
    ["B", "C", "W", "G", "F", "S"],
    ["H", "T", "P", "M", "Q", "B", "W"],
    ["F", "S", "W", "T"],
    ["N", "C", "R"],
  ]
  const rearraged = rearrange9000(input, stacks)
  return rearraged
}

function partTwo(input) {
  const stacks = [
    ["S", "Z", "P", "D", "L", "B", "F", "C"],
    ["N", "V", "G", "P", "H", "W", "B"],
    ["F", "W", "B", "J", "G"],
    ["G", "J", "N", "F", "L", "W", "C", "S"],
    ["W", "J", "L", "T", "P", "M", "S", "H"],
    ["B", "C", "W", "G", "F", "S"],
    ["H", "T", "P", "M", "Q", "B", "W"],
    ["F", "S", "W", "T"],
    ["N", "C", "R"],
  ]
  const output = rearrange9001(input, stacks)
  return output
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

console.time("Part Two Time")
const partTwoResult = partTwo(input)
console.timeEnd("Part Two Time")
console.log("Solution to part 2: ", partTwoResult)

console.log("-----------------")

export {}
