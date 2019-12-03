// https://adventofcode.com/2018/day/1/input

const input = require("./inputs/day_1")

const partOne = input =>
  input.split(/\n/g).reduce((acc, curr) => (acc += Number(curr)), 0)

const partTwo = input => {
  const changes = input.split(/\n/g)
  const seen = {}
  let frequency = 0
  while (true) {
    for (const change of changes) {
      frequency += Number(change)
      if (seen[frequency]) return frequency
      seen[frequency] = true
    }
  }
}

console.log(partOne(input))
console.log(partTwo(input))
