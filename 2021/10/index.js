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

const corruptedScoreMap = new Map([
  [">", 25137],
  ["}", 1197],
  ["]", 57],
  [")", 3],
])

const autoCompleteMap = new Map([
  [")", 1],
  ["]", 2],
  ["}", 3],
  [">", 4],
])

function getCorruptedScore(line) {
  const chars = [...line.trim()]
  const matched = []
  let lineScore = 0
  for (let char of chars) {
    if (openingChars.includes(char)) {
      matched.push(closingMap.get(char))
    } else {
      if (char === matched[matched.length - 1]) {
        matched.pop()
      } else {
        lineScore += corruptedScoreMap.get(char)
        break
      }
    }
  }
  return lineScore
}

function partOne(input) {
  let scores = 0
  for (let line of input) {
    const lineScore = getCorruptedScore(line)
    scores += lineScore
  }
  return scores
}

function partTwo(input) {
  let scores = []
  for (let line of input) {
    const lineScore = getCorruptedScore(line)
    if (lineScore === 0) {
      const matched = []
      let autoCompleteScore = 0

      for (char of [...line]) {
        if (openingChars.includes(char)) matched.push(closingMap.get(char))
        else if (char === matched[matched.length - 1]) matched.pop()
      }

      matched.reverse().forEach((needed) => {
        autoCompleteScore *= 5
        autoCompleteScore += autoCompleteMap.get(needed)
      })

      scores.push(autoCompleteScore)
    }
  }
  return scores.sort((a, b) => a - b)[Math.round(scores.length / 2)]
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

test(partOne(prepareInput(testInput)), 26397)
test(partTwo(prepareInput(testInput)), 288957)

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
