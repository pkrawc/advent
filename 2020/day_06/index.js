const { groupEnd } = require("console")
const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.trim().split("\n\n")

const input = prepareInput(readInput())

const getAnswers = (group) =>
  new Set(
    group
      .split(/\n/)
      .reduce((s, l) => s.concat(l))
      .split("")
  )

function partOne(input) {
  return input
    .map((group) => {
      return new Set(
        group
          .split(/\n/)
          .reduce((s, l) => s.concat(l))
          .split("")
      )
    })
    .reduce((count, set) => (count += set.size), 0)
}

function partTwo(input) {
  return input
    .map((group) => {
      const answers = Array.from(getAnswers(group))
      const eachAnswer = group.split(/\n/)
      return answers.map((letter) =>
        eachAnswer.every((answer) => answer.split("").includes(letter))
      )
    })
    .reduce((count, group) => (count += group.filter((item) => item).length), 0)
}

/* Tests */

const testString = `
abc

a
b
c

ab
ac

a
a
a
a

b
`

test(partTwo(prepareInput(testString)), 6)

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
