const { readInput, test } = require("../../utils")

class LanternFish {
  constructor(initialTimer) {
    this.timer = parseInt(initialTimer)
  }
  step() {
    const currentTime = this.timer
    this.timer = this.timer - 1
    if (currentTime === 0) {
      return this.create()
    }
  }
  create() {
    this.timer = 6
    return new LanternFish(8)
  }
}

const prepareInput = (rawInput) => rawInput.split(",")

const input = prepareInput(readInput())

function partOne(input) {
  const lanternFish = []
  for (let number of input) {
    lanternFish.push(new LanternFish(number))
  }
  for (let i = 0; i < 80; i++) {
    lanternFish.forEach((fish) => {
      const newFish = fish.step()
      if (newFish) {
        lanternFish.push(newFish)
      }
    })
  }
  return lanternFish.length
}

const sum = (array) => array.reduce((t, i) => t + i, 0)

function partTwo(input) {
  // Can't iterate fishes, need to iterate on days and store fish in buckets.
  const fishes = input.map((f) => parseInt(f))
  const states = Array.from(Array(10), (item, idx) => parseInt(idx))
  const counts = states.map((s) => fishes.filter((c) => c === s).length)
  // console.log(states)
  for (let i = 0; i < 256; i++) {
    counts[9] += counts[0]
    counts[7] += counts[0]
    counts[0] = 0
    states.forEach((state) => (counts[state] = counts[state + 1] || 0))
  }
  return sum(counts)
}

/* Tests */

// const testInput = `3,4,3,1,2`

// test(partTwo(prepareInput(testInput)), 26984457539)

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
