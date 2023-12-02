import { readInput, test, sum } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => {
  return rawInput.split(/\n/).map((line) => {
    const [id, dice] = line.split(": ")
    return {
      id: id.split(" ")[1],
      reveals: dice.split("; ").map((dice) =>
        dice.split(", ").reduce((acc, die) => {
          const [num, color] = die.split(" ")
          return { ...acc, [color]: parseInt(num) }
        }, {})
      ),
    }
  })
}

type Game = {
  id: string
  reveals: { red: number; green: number; blue: number }[]
}

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function findPossibilities(input: Game[], rMax = 12, gMax = 13, bMax = 14) {
  let possibleGames = []
  for (let game of input) {
    let possibleGame = true
    for (let { red, green, blue } of game.reveals) {
      if (red > rMax || green > gMax || blue > bMax) {
        possibleGame = false
      }
    }
    if (possibleGame) {
      possibleGames.push(parseInt(game.id))
    }
  }
  return possibleGames
}

function getMinSets(input: Game[]) {
  let minSets = []
  for (let game of input) {
    let mins = { red: 0, green: 0, blue: 0 }
    for (let { red, green, blue } of game.reveals) {
      mins.red = Math.max(mins.red, red || 0)
      mins.green = Math.max(mins.green, green || 0)
      mins.blue = Math.max(mins.blue, blue || 0)
    }
    minSets.push(mins.red * mins.green * mins.blue)
  }
  return minSets
}

function partOne(input) {
  const possibilities = findPossibilities(input)
  return sum(possibilities)
}

function partTwo(input) {
  const sets = getMinSets(input)
  return sum(sets)
}

/* Tests */

// const result = findPossibilities(testInput)

// test(result, 8)

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

export {}
