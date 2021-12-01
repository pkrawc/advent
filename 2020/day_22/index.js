const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.trim().split(/\n\n/)

const input = prepareInput(readInput())

function partOne(input) {
  const [pOne, pTwo] = input
  const [nameOne, ...deckOne] = pOne.split(/\n/).map(Number)
  const [nameTwo, ...deckTwo] = pTwo.split(/\n/).map(Number)
  let winner = false
  while (!winner) {
    const playerOneCard = deckOne.shift()
    const playerTwoCard = deckTwo.shift()
    if (!playerOneCard) {
      winner = deckTwo
      continue
    }
    if (!playerTwoCard) {
      winner = deckOne
      continue
    }
    if (playerOneCard > playerTwoCard) {
      deckOne.push(playerOneCard, playerTwoCard)
    } else {
      deckTwo.push(playerTwoCard, playerOneCard)
    }
  }
  return winner.reduceRight((score, card, idx, arr) => {
    const cardThing = arr.length - (idx + 1)
    return (score += cardThing * card)
  })
}

function partTwo(input) {
  return
}

/* Tests */

// test(result, expected)

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
