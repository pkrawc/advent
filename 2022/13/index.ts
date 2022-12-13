import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function checkOrder(left, right) {
  for (let i = 0; i < left.length; i++) {
    let arrays = false
    if (right[i] === undefined) {
      return false
    }
    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      arrays = true
      const correctOrder = checkOrder(left[i], right[i])
      if (correctOrder !== null) return correctOrder
    } else if (Array.isArray(left[i])) {
      arrays = true
      const correctOrder = checkOrder(left[i], [right[i]])
      if (correctOrder !== null) return correctOrder
    } else if (Array.isArray(right[i])) {
      arrays = true
      const correctOrder = checkOrder([left[i]], right[i])
      if (correctOrder !== null) return correctOrder
    }
    if (!arrays) {
      if (left[i] < right[i]) return true
      else if (left[i] > right[i]) return false
    }
  }
  return left.length < right.length ? true : null
}

function partOne(input) {
  let sum = 0
  const indicies = []
  for (let idx = 0; idx < input.length; idx++) {
    const [left, right] = input[idx].split(/\n/).map((s: string) => eval(s))
    if (checkOrder(left, right)) {
      indicies.push(idx)
      sum += idx + 1
    }
  }
  return sum
}

function partTwo(input) {
  const packets = input
    .map((group) => group.split(/\n/).map((s: string) => eval(s)))
    .flat()
  packets.push([[2]], [[6]])
  const sorted = packets.sort((a, b) => {
    const order = checkOrder(a, b)
    return order ? -1 : 1
  })
  const a = sorted.findIndex((p) => JSON.stringify(p) === JSON.stringify([[2]]))
  const b = sorted.findIndex((p) => JSON.stringify(p) === JSON.stringify([[6]]))
  return (a + 1) * (b + 1)
}

/* Tests */

// const orderedPackets = partTwo(testInput)

// test(orderedPackets, 140)

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
