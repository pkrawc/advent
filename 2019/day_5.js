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
      case 1:
        sequence[insert] = a + b
        console.log(a + b)
        index += 4
        break
      case 2:
        sequence[insert] = a * b
        index += 4
        break
      case 3:
        sequence[a] = input
        index += 2
        break
      case 4:
        output.push(sequence[a])
        index += 2
        break
      default:
        throw Error(`Encountered an incorrect opCode ${code} at ${index}`)
    }
  }
  return [output]
}

function dayFive(input) {
  const sequence = getSequence(input)
  try {
    const result = compileWithInput(sequence, 1)
    return result
  } catch (err) {
    console.log(err.message)
  }
}

console.log(dayFive(input))

module.exports = dayFive
