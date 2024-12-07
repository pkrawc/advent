import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((row) => row.split(""))
    .reduce((coords, row, y) => {
      for (let [x, char] of row.entries()) {
        coords.set(`${x},${y}`, char)
      }
      return coords
    }, new Map())

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

const directions: [string, number[]][] = [
  ["^", [0, -1]],
  [">", [1, 0]],
  ["V", [0, 1]],
  ["<", [-1, 0]],
]

function tryCoord(
  grid,
  initialGuardPos,
  obs: { ox?: number; oy?: number } = {}
) {
  const { ox, oy } = obs
  const positions = new Set()
  const visited = new Set()
  const guard = { ...initialGuardPos }
  let looped = false
  while (grid.has(`${guard.x},${guard.y}`)) {
    const visitedKey = `${guard.x},${guard.y},${guard.dir}`
    if (visited.has(visitedKey)) {
      looped = true
      break
    }

    visited.add(visitedKey)

    const directionIdx = directions.findIndex((d) => guard.dir === d[0])
    const currentDirection = directions[directionIdx]
    const dx = guard.x + currentDirection[1][0]
    const dy = guard.y + currentDirection[1][1]
    const obstruction =
      grid.get(`${dx},${dy}`) === "#" || (dx === ox && dy === oy)
    if (obstruction) {
      guard.dir = directions[(directionIdx + 1) % directions.length][0]
    } else {
      positions.add(`${guard.x},${guard.y}`)
      guard.x = dx
      guard.y = dy
    }
  }

  return { visited, positions, looped }
}

const getCoordNums = (coord) => coord.split(",").map((n) => parseInt(n))

function partOne(input: Map<string, string>) {
  const [coords, dir] = Array.from(input).find((cell) =>
    directions.some((d) => d[0] === cell[1])
  )
  const [gx, gy] = getCoordNums(coords)
  const guard = { x: gx, y: gy, dir }
  const { positions } = tryCoord(input, guard)

  return positions.size
}

function partTwo(input: Map<string, string>) {
  const [coords, dir] = Array.from(input).find((cell) =>
    directions.some((d) => d[0] === cell[1])
  )
  const [gx, gy] = getCoordNums(coords)
  input.set(coords, ".")
  const guard = { dir, x: gx, y: gy }
  let loopCoords = 0
  for (let [coord, char] of input) {
    const [x, y] = getCoordNums(coord)
    if ((x !== gx || y !== gy) && char === ".") {
      const { looped } = tryCoord(input, guard, { ox: x, oy: y })
      loopCoords += looped ? 1 : 0
    }
  }
  return loopCoords
}

/* Tests */

// const result = partTwo(testInput)

// test(result, 41)

/* Results */

const { log, time, timeEnd } = console

const success = chalk.bold.green
const timer = chalk.bold.blue
const seperator = chalk.bold.white("-----------------")

log(seperator)

time(timer("Part One Time"))
const partOneResult = partOne(input)
timeEnd(timer("Part One Time"))
log(success("Solution to part 1: ", partOneResult))

log(seperator)

time(timer("Part Two Time"))
const partTwoResult = partTwo(input)
timeEnd(timer("Part Two Time"))
log(success("Solution to part 2: ", partTwoResult))

log(seperator)
