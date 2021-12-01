const { readInput, test } = require("../../utils")

const rawTest = `
F10
N3
F7
R90
F11
`

const prepareInput = (rawInput) =>
  rawInput
    .trim()
    .split(/\n/)
    .map((s) => {
      const match = s.match(/(\w)(\d+)/)
      return [match[1], match[2]]
    })

const input = prepareInput(readInput())

function partOne(input) {
  const coords = {
    bearing: 0,
    directions: ["E", "N", "W", "S"],
    north: 0,
    east: 0,
  }
  const operations = {
    N: (dis) => (coords.north += dis),
    S: (dis) => (coords.north -= dis),
    E: (dis) => (coords.east += dis),
    W: (dis) => (coords.east -= dis),
    L: (ang) => (coords.bearing += ang),
    R: (ang) => (coords.bearing += 360 - ang),
    F: (dis) => {
      const direction = coords.directions[(coords.bearing / 90) % 4]
      return operations[direction](dis)
    },
  }
  input.forEach((inst) => {
    const [command, value] = inst
    operations[command](Number(value))
  })
  return Math.abs(coords.north) + Math.abs(coords.east)
}

function partTwo(input) {
  const coords = {
    bearing: 0,
    directions: ["E", "N", "W", "S"],
    // [[N,E],[W,S]]
    waypoints: [
      [1, 10],
      [0, 0],
    ],
    north: 0,
    east: 0,
  }
  function rotate(turn) {
    for (i = 0; i < turn; i++) {
      const [top] = coords.waypoints
      coords.waypoints = top.map((val, idx) =>
        coords.waypoints.map((row) => row[idx]).reverse()
      )
    }
  }
  const operations = {
    N: (dis) => (coords.north += dis),
    S: (dis) => (coords.north -= dis),
    E: (dis) => (coords.east += dis),
    W: (dis) => (coords.east -= dis),
    L: (ang) => rotate(((360 - ang) / 90) % 4),
    R: (ang) => rotate((ang / 90) % 4),
    F: (dis) => {
      const direction = coords.direction[(coords.angle / 90) % 4]
      operations[direction](dis)
    },
  }
  const waypointOperations = {
    N: (dis) => (coords.waypoints[0][0] += dis),
    S: (dis) => (coords.waypoints[1][1] -= dis),
    E: (dis) => (coords.waypoints[0][1] += dis),
    W: (dis) => (coords.waypoints[1][0] -= dis),
    L: (ang) => rotate(((360 - ang) / 90) % 4),
    R: (ang) => rotate((ang / 90) % 4),
    F: (dis) => {
      operations["N"](dis * coords.waypoints[0][0])
      operations["S"](dis * coords.waypoints[1][1])
      operations["E"](dis * coords.waypoints[0][1])
      operations["W"](dis * coords.waypoints[1][0])
    },
  }
  input.forEach((inst) => {
    const [command, value] = inst
    waypointOperations[command](Number(value))
  })
  return Math.abs(coords.north) + Math.abs(coords.east)
}

/* Tests */

const testInput = prepareInput(rawTest)

const result = partOne(testInput)

console.log(result)

test(result, 25)

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
