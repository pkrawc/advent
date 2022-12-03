import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

const input = prepareInput(readInput())

function findCommonSplit(first, second) {
  let commonLetters = ""
  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i])) {
      commonLetters += first[i]
    }
  }
  return commonLetters
}

function findCommonThreeGroup(group) {
  let commonLetters = ""
  for (let i = 0; i < group[0].length; i++) {
    if (group[1].includes(group[0][i]) && group[2].includes(group[0][i])) {
      commonLetters += group[0][i]
    }
  }
  return commonLetters
}

const letterMap = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((prev, letter, idx) => {
    return { ...prev, [letter]: idx + 1 }
  }, {})

function partOne(input: string[]) {
  const splitSacks = input.map((line) => {
    const first = line.slice(0, line.length / 2)
    const second = line.slice(line.length / 2)
    return [first, second]
  })
  const commonLetters = splitSacks.map(([first, second]) =>
    findCommonSplit(first, second)
  )
  return commonLetters
    .map((l) => letterMap[l.charAt(0)])
    .reduce((prev, curr) => prev + (curr || 0), 0)
}

function partTwo(input: string[]) {
  const sackGroups = []
  for (let i = 0, g = 0; i < input.length; i++) {
    if (i >= 3 && i % 3 === 0) {
      g++
    }
    sackGroups[g] = sackGroups[g] || []
    sackGroups[g].push(input[i])
  }

  const commonLetters = sackGroups.map((group) => findCommonThreeGroup(group))
  return commonLetters
    .map((l) => letterMap[l.charAt(0)])
    .reduce((prev, curr) => prev + (curr || 0), 0)
}

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
