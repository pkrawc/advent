import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

function triggerPolymer(polymer: string) {
  let i = 0
  while (i < polymer.length - 1) {
    const curr = polymer[i]
    const next = polymer[i + 1]
    if (curr !== next && curr.toLowerCase() === next.toLowerCase()) {
      polymer = polymer.slice(0, i) + polymer.slice(i + 2)
      i = 0
    } else {
      i++
    }
  }
  return polymer
}

const polymerUnits = Array.from(Array(26)).map((e, i) =>
  String.fromCharCode(i + 65)
)

function findOptimalPolymer(polymer: string) {
  const unitsMap = new Map()
  for (let unit of polymerUnits) {
    // Remove all of unit from polymer chain
    const regex = new RegExp(unit, "ig")
    const testChain = polymer.replaceAll(regex, "")
    // Get length
    const chainLength = triggerPolymer(testChain).length
    unitsMap.set(unit, chainLength)
  }
  return [...unitsMap].sort((a, b) => a[1] - b[1])
}

function partOne(input) {
  return triggerPolymer(input).length
}

function partTwo(input) {
  const optimal = findOptimalPolymer(input)
  return optimal[0][1]
}

/* Tests */

// const testInput = `dabAcCaCBAcCcaDA`

// test(triggerPolymer(testInput), "dabCBAcaDA")

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
