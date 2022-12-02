const { readInput, test } = require("../../utils")

const input = readInput()

const depthNums = input.split(/\n/).map((depth) => parseInt(depth))

function depthMeasurement(depths) {
  let x = 0
  depths.forEach((depth, idx) => {
    if (depth > depthNums[idx - 1]) x++
  })
  return x
}

function slidingMeasurement(depths) {
  let increase = 0
  let prev = 0
  depths.forEach((depth, idx, array) => {
    if (!array[idx + 2]) return
    const next = depth + array[idx + 1] + array[idx + 2]
    if (prev < next && prev !== 0) {
      increase++
    }
    prev = next
  })
  return increase
}

test(depthMeasurement(depthNums), 1139)

test(slidingMeasurement(depthNums), 1103)
