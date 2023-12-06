import { readInput, test } from "@utils"
import chalk from "chalk"

type Game = {
  id: string
  winners: number[]
  values: number[]
}

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => {
    const [game, numbers] = line.split(": ")
    const [id] = game.match(/\d+/g)
    const [winners, values] = numbers
      .split(" | ")
      .map((str) => str.match(/\d+/g).map((n) => parseInt(n)))
    return { id, winners, values }
  })

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getWinners(game) {
  let winners = []
  for (let value of game.values) {
    if (game.winners.includes(value)) {
      winners.push(value)
    }
  }
  return winners
}

function sumCardPoints(games: Game[]) {
  let points = 0
  for (let game of games) {
    const winners = getWinners(game)
    let winnerCount = winners.length
    points += winnerCount >= 2 ? 2 ** (winnerCount - 1) : winnerCount
  }
  return points
}

function getGameCopies(input: Game[]) {
  const cards = input.map((game) => {
    const winners = getWinners(game)
    return { id: game.id, matches: winners.length }
  })
  let idx = 0
  while (idx < cards.length) {
    const id = parseInt(cards[idx].id)
    for (let i = 0; i < cards[idx].matches; i++) {
      cards.push({
        id: cards[id + i].id,
        matches: cards[id + i].matches,
      })
    }
    idx++
  }
  return cards
}

function partOne(input) {
  const points = sumCardPoints(input)
  return points
}

function partTwo(input) {
  const copies = getGameCopies(input)
  return copies.length
}

/* Tests */

// const result = getGameCopies(testInput)

// console.log(result)

// test(result.length, 30)

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

// log(seperator)

export {}
