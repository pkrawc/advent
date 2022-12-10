import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split("\n")

const input = prepareInput(readInput())

function partOne(input) {
  const strenghts = []
  let cycle = 0
  let x = 1

  for (let line of input) {
    const [instruction, number] = line.split(" ")

    cycle++

    if (cycle % 40 == 20) strenghts.push(cycle * x)

    if (instruction === "addx") {
      cycle++
      if (cycle % 40 == 20) strenghts.push(cycle * x)
      x += parseInt(number)
    }
  }
  return strenghts.reduce((a, b) => a + b, 0)
}

function partTwo(input) {
  let sprite = 1
  let cycles = 0
  let letters = ""

  function drawSprite() {
    let position = cycles % 40
    letters += Math.abs(position - sprite) <= 1 ? "#" : " "
    cycles++
    if (cycles % 40 == 0) letters += "\n"
  }

  for (let line of input) {
    let [instruction, number] = line.split(" ")

    drawSprite()
    if (instruction == "addx") {
      drawSprite()
      sprite += parseInt(number)
    }
  }

  console.log(letters)

  return "RZEKEFHA"
}

/* Tests */

const testInput = prepareInput(readInput("test-input.txt"))

const result = partOne(testInput)

test(result, 13140)

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
