import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((game) => game.split(" "))

const shapeMap = {
  X: 0,
  Y: 3,
  Z: 6,
}

const winMap = {
  "A:X": 1 + 3,
  "A:Y": 2 + 6,
  "A:Z": 3 + 0,
  "B:X": 1 + 0,
  "B:Y": 2 + 3,
  "B:Z": 3 + 6,
  "C:X": 1 + 6,
  "C:Y": 2 + 0,
  "C:Z": 3 + 3,
}

const choiceMap = {
  "A:X": 3 + 0,
  "A:Y": 1 + 3,
  "A:Z": 2 + 6,
  "B:X": 1 + 0,
  "B:Y": 2 + 3,
  "B:Z": 3 + 6,
  "C:X": 2 + 0,
  "C:Y": 3 + 3,
  "C:Z": 1 + 6,
}

function getPoints(input: string[][]) {
  return input.reduce((points, game) => {
    const [player, guide] = game
    const key = `${player}:${guide}`
    const win = winMap[key]
    return points + win
  }, 0)
}

const input = prepareInput(readInput())

function partOne<T>(input: any) {
  return getPoints(input)
}

function partTwo<T>(input: any) {
  return input.reduce((points, game) => {
    const [opp, outcome] = game

    const key = `${opp}:${outcome}`
    const choicePoints = choiceMap[key]
    return points + choicePoints
  }, 0)
}

/* Tests */

const testInput = prepareInput(`A Y
B X
C Z`)

const testResult = getPoints(testInput)

test(15, testResult)

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
