const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.split(/\n/)

const input = prepareInput(readInput())

const openingChars = ["(", "[", "{", "<"]

const closingMap = new Map([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
])

const scoreMap = new Map([
  [">", 25137],
  ["}", 1197],
  ["]", 57],
  [")", 3],
])

function partOne(input) {
  let scores = []

  for (let line of input) {
    const chars = [...line.trim()]
    const matched = []
    for (let char of chars) {
      if (openingChars.includes(char)) {
        matched.push(closingMap.get(char))
      } else {
        if (char === matched.slice(-1)[0]) {
          matched.pop()
        } else {
          scores.push(scoreMap.get(char))
        }
      }
    }
  }
  return scores
}

function partTwo(input) {
  return
}

/* Tests */

const testInput = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`

const result = partOne(prepareInput(testInput))

test(result, 26397)

/* Results */

// console.log("-----------------")

// console.time("Part One Time")
// const partOneResult = partOne(input)
// console.timeEnd("Part One Time")
// console.log("Solution to part 1: ", partOneResult)

// console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")
