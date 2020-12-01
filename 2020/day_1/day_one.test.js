const input = require("./input")
const { partOne, partTwo } = require("./index")

const testInput = `
1721
979
366
299
675
1456
`

test("Day 1 | Part 1", () => {
  testInput
  const partOneResult = partOne(testInput)
  expect(partOneResult).toEqual(514579)
})

test("Day 1 | Part 2", () => {
  const partTwoResult = partTwo(testInput)
  expect(partTwoResult).toEqual(241861950)
})
