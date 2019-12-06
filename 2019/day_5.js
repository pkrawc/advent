const { getSequence, getInstructions } = require("./day_2")
const input = require("./inputs/day_5")

const getMode = (mode, value, sequence) => (mode ? value : sequence[value])

const getCode = code =>
  code
    .toString()
    .padStart(5, "0")
    .match(/(\d)(\d)(\d)(\d\d)/u)
    .slice(1)
    .map(Number)
    .reverse()

function compileWithInput(sequence, input) {
  const output = []
  let index = 0
  while (index < sequence.length && sequence[index] !== 99) {
    const [code, firstMode, secondMode] = getCode(sequence[index])
    const a = getMode(firstMode, sequence[index + 1], sequence)
    const b = getMode(secondMode, sequence[index + 2], sequence)
    const insert = sequence[index + 3]
    switch (code) {
      case 1: // Add params
        sequence[insert] = a + b
        index += 4
        break
      case 2: // Multiply params
        sequence[insert] = a * b
        index += 4
        break
      case 3: // Get input
        sequence[sequence[index + 1]] = input
        index += 2
        break
      case 4: // Write output
        output.push(sequence[sequence[index + 1]])
        index += 2
        break
      case 5: // Jump if true
        if (Number(a)) index = b
        else index += 3
        break
      case 6: // Jump if false
        if (!Number(a)) index = b
        else index += 3
        break
      case 7: // Less than
        sequence[insert] = a < b ? 1 : 0
        index += 4
        break
      case 8: // Equal to
        sequence[insert] = Number(a) === Number(b) ? 1 : 0
        index += 4
        break
      default:
        throw Error(`Encountered an incorrect opCode ${code} at ${index}`)
    }
  }
  return [sequence, output]
}

class DayFive {
  partOne(sequence, input) {
    try {
      const result = compileWithInput(getSequence(sequence), input)
      return result
    } catch (err) {
      console.log(err.message)
    }
  }
  partTwo(sequence, input) {
    try {
      const result = compileWithInput(getSequence(sequence), input)
      return result
    } catch (err) {
      console.log(err.message)
    }
  }
}

const day = new DayFive()

console.log(day.partTwo(input, 5)[1])

// console.log(dayFive(input)[1])

module.exports = DayFive
