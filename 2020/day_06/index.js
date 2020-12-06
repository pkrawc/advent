const { groupEnd } = require("console")
const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.trim().split("\n\n")

const input = prepareInput(readInput())

const getAnswers = (group) =>
  Array.from(
    new Set(
      group
        .split(/\n/)
        .reduce((s, l) => s.concat(l))
        .split("")
    )
  )

const getCount = (count, group) => (count += group.length)

function partOne(input) {
  return input.map(getAnswers).reduce(getCount, 0)
}

function partTwo(input) {
  return input
    .map((group) => {
      const possibleAnswers = getAnswers(group)
      const eachPerson = group.split(/\n/)
      return possibleAnswers.filter((letter) =>
        eachPerson.every((answer) => answer.split("").includes(letter))
      )
    })
    .reduce(getCount, 0)
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
