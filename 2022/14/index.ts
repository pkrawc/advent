import { readInput, test } from "@utils"

type Coords = [x: number, y: number]

type CoordsKey = `${number},${number}`

type CoordsSet = Set<CoordsKey>

const prepareInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((seam) =>
      seam.split(" -> ").map((coord) => coord.split(",").map(Number))
    )

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function buildCave(input: Coords[][]): [CoordsSet, number] {
  let height = 0
  const cave: CoordsSet = new Set()
  for (const seam of input) {
    for (const [idx, [cX, cY]] of seam.entries()) {
      if (!seam[idx + 1]) break
      const [nX, nY] = seam[idx + 1]
      for (
        let x = cX, y = cY;
        x !== nX || y !== nY;
        // I had no idea this function existed. Would be helpful for day 9.
        // Found solution here: https://stackoverflow.com/questions/7037669/how-to-check-the-value-given-is-a-positive-or-negative-integer
        x += Math.sign(nX - cX), y += Math.sign(nY - cY)
      ) {
        cave.add(`${x},${y}`)
      }
      cave.add(`${nX},${nY}`)
      height = Math.max(height, cY, nY)
    }
  }
  height += 1
  return [cave, height]
}

function pourSand(cave: CoordsSet, maxHeight: number, floor = false) {
  const sand: CoordsSet = new Set()
  let full = false
  let newGrain = false
  while (!full) {
    let [x, y] = [500, 0]
    newGrain = true
    while (newGrain) {
      if (!floor && y >= maxHeight) {
        newGrain = false
        full = true
        continue
      }
      if (
        !cave.has(`${x},${y + 1}`) &&
        !sand.has(`${x},${y + 1}`) &&
        y < maxHeight
      ) {
        y += 1
        continue
      }
      if (
        !cave.has(`${x - 1},${y + 1}`) &&
        !sand.has(`${x - 1},${y + 1}`) &&
        y < maxHeight
      ) {
        x -= 1
        y += 1
        continue
      }
      if (
        !cave.has(`${x + 1},${y + 1}`) &&
        !sand.has(`${x + 1},${y + 1}`) &&
        y < maxHeight
      ) {
        x += 1
        y += 1
        continue
      }
      sand.add(`${x},${y}`)
      newGrain = false
    }
    if (x === 500 && y === 0) full = true
  }
  return sand
}

function partOne(input) {
  const [cave, height] = buildCave(input)
  const fallenSand = pourSand(cave, height)
  return fallenSand.size
}

function partTwo(input) {
  const [cave, height] = buildCave(input)
  const fallenSand = pourSand(cave, height, true)
  return fallenSand.size
}

/* Tests */

const partOneTest = partOne(testInput)

// test(partOneTest, 24)

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
