const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => {
  const [numberString, ...boardStrings] = rawInput.split(/\n\s*\n/)
  const boards = boardStrings.map((string, idx) => {
    const board = []
    const rows = string.split(/\n/)
    for (let row = 0; row < rows.length; row++) {
      const cells = rows[row]
        .trim()
        .split(" ")
        .filter((cell) => cell !== "")
      const boardRow = []
      for (let cell = 0; cell < cells.length; cell++) {
        boardRow[cell] = { value: cells[cell], marked: false }
      }
      board[row] = boardRow
    }
    return board
  })
  const numbers = numberString.split(",")
  return [numbers, boards]
}

const input = prepareInput(readInput())

function partOne([numbers, boards]) {
  let idx = 0
  let winningBoard = null
  let winningNum = null
  while (!winningBoard) {
    let currentNumber = numbers[idx]
    // Mark each board.
    boards.forEach((board) => {
      board.forEach((row) => {
        row.forEach((cell) => {
          if (cell.value === currentNumber) cell.marked = true
        })
      })
    })

    // Check each board.
    boards.forEach((rows, boardIdx) => {
      // Check rows
      rows.some((row) => {
        if (row.every((cell) => cell.marked)) {
          winningBoard = boards[boardIdx]
          winningNum = numbers[idx]
          return true
        }
      })
      // Check columns

      const columns = []

      for (let i = 0; i < 5; i++) {
        const column = []
        rows.forEach((row) => column.push(row[i]))
        columns.push(column)
      }

      columns.some((column) => {
        if (column.every((cell) => cell.marked)) {
          winningBoard = boards[boardIdx]
          winningNum = numbers[idx]
          return true
        }
      })
    })
    idx++
  }
  const sum = winningBoard
    .flat()
    .filter((cell) => !cell.marked)
    .reduce((sum, cell) => {
      return (sum += parseInt(cell.value))
    }, 0)
  return parseInt(winningNum) * sum
}

function partTwo(input) {
  return "Part Two"
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
