import { getNeighbors, readInput, sum, test } from "@utils"
import chalk from "chalk"

type Cell = {
  char: string
  x: number
  y: number
}

type PartNumber = [number[], Cell[]]

const prepareInput = (rawInput: string): Cell[][] =>
  rawInput.split(/\n/).map((row, rIdx) => {
    return row.split("").map((char, colIdx) => ({ char, x: colIdx, y: rIdx }))
  })

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getNumbers(grid: Cell[][]) {
  let idx = 0
  const partNumbers = new Map<number[], Cell[]>()
  for (let row of grid) {
    const numberCells = new Set<Cell>()
    for (let { char, x, y } of row) {
      if (!char.match(/\d/)) {
        if (numberCells.size > 0) {
          const number = parseInt(
            [...numberCells].map((c: any) => c.char).join("")
          )
          partNumbers.set([number, idx], Array.from(numberCells))
          numberCells.clear()
          idx++
        }
        continue
      } else {
        numberCells.add({ x, y, char })
      }
    }
  }
  return Array.from(partNumbers.entries())
}

function filterPartNumbers(numbers: PartNumber[], grid: Cell[][]) {
  return numbers.filter(([_, cells]) => {
    const neighbors = new Set()
    for (let cell of cells) {
      const cellNeighbors = getNeighbors(cell.x, cell.y)
      for (let [x, y] of cellNeighbors) {
        if (grid[y]?.[x]) neighbors.add(grid[y]?.[x])
      }
    }
    return Array.from(neighbors).some(
      (neighbor: Cell) => !neighbor.char.match(/\d|\./)
    )
  })
}

function partOne(input) {
  const partNumbers = getNumbers(input)
  const result = filterPartNumbers(partNumbers, input)
  const numbersSum = sum(result.map(([[num]]) => num))
  // console.log(JSON.stringify(result, null, 2))
  return numbersSum
}

function partTwo(input) {
  return input
}

/* Tests */

const partNumbers = getNumbers(testInput)
const filteredPartNums = filterPartNumbers(partNumbers, testInput)
const numbersSum = sum(filteredPartNums.map(([[num]]) => num))

// console.log(JSON.stringify(filteredPartNums, null, 2))

test(numbersSum, 4361)

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

// time(timer("Part Two Time"))
// const partTwoResult = partTwo(input)
// timeEnd(timer("Part Two Time"))
// log(success("Solution to part 2: ", partTwoResult))

// log(seperator)

export {}
