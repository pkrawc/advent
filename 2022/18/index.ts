import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.split(",").map(Number))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

type Cube = boolean[][][]

type Points = [x: number, y: number, z: number][]

// let example = [
//   [
//     // X 1
//     [
//       // Y 1
//       [1, 2, 3], // Z
//     ],
//   ],
// ]

function createLavaDrop(input) {
  const points = input.map(([x, y, z]) => [x + 1, y + 1, z + 1])
  // Need a cube big enough to map the lava points in.
  const mx = Math.max(...points.map((p) => p[0])) + 1
  const my = Math.max(...points.map((p) => p[1])) + 1
  const mz = Math.max(...points.map((p) => p[2])) + 1

  const zSpace = [...Array(mz + 1)].fill(false)
  const ySpace = [...Array(my + 1)].fill(zSpace)
  const drop: Cube = [...Array(mx + 1)].fill(ySpace)

  for (const [x, y, z] of points) {
    console.log({ x, y, z })
    drop[x][y][z] = true
  }

  return [drop, points]
}

function getSurfaceArea(drop: Cube, points: Points) {
  let sides = 0
  const transforms = [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0],
  ]
  for (const [px, py, pz] of points) {
    // console.log({ px, py, pz })
    for (const [tx, ty, tz] of transforms) {
      // console.log(drop[px + tx][py + ty][pz + tz])
      if (!drop[px + tx][py + ty][pz + tz]) {
        sides++
      }
    }
  }
  return sides
}

function partOne(input) {
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const [drop, points] = createLavaDrop(testInput)
// console.log(drop)
const sides = getSurfaceArea(drop, points)

console.log(sides)

// test(result, expected)

/* Results */

// console.log("-----------------")

// console.time("Part One Time")
// const partOneResult = partOne(input)
// console.timeEnd("Part One Time")
// console.log("Solution to part 1: ", partOneResult)

// console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")

export {}
