const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) =>
  rawInput.split(/\n/).map((row) => row.split(""))

const input = prepareInput(readInput())

function createOpctopi(input) {
  const octopi = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      octopi.push({ x, y, state: input[y][x] })
    }
  }
  return octopi
}

function getAdjacentOctopi(octopi, x, y) {
  const adjacentOctopi = []
  for (let i = 0; i < octopi.length; i++) {
    const octopus = octopi[i]
    if (octopus.x === x && octopus.y === y) {
      continue
    }
    if (Math.abs(octopus.x - x) <= 1 && Math.abs(octopus.y - y) <= 1) {
      adjacentOctopi.push(octopus)
    }
  }
  return adjacentOctopi
}

function partOne(input, steps) {
  let octopi = createOpctopi(input)
  let flashes = 0
  for (let i = 0; i < steps; i++) {
    // update octopi states
    octopi.map((oct) => ({ ...oct, state: oct.state + 1 }))
    // check if any octopi are flashing
    for (let j = 0; j < octopi.length; j++) {
      const octopus = octopi[j]
      if (octopus.state % 9 === 0) {
        flashes++
        const adjacentOctopi = getAdjacentOctopi(octopi, octopus.x, octopus.y)
        adjacentOctopi.forEach((oct) => {
          octopi[oct.y][oct.x] = { ...oct, state: oct.state + 1 }
          if ((oct.state + 1) % 9 === 0) {
            flashes++
          }
        })
      }
    }
  }
  return flashes
}

test(partOne(prepareInput(readInput("test.txt")), 10), 204)
