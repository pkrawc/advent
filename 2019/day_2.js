const input = require("./inputs/day_2")

function getSequence(input, noun, verb) {
  return input
    .split(",")
    .map((value, i) => (i === 1 ? noun : i === 2 ? verb : Number(value)))
}

function getInstructions(sequence) {
  const output = []
  while (sequence.length) {
    output.push(sequence.splice(0, 4))
  }
  return output
}

function compute(sequence, instructions) {
  for (let instruction of instructions) {
    const code = instruction[0]
    const a = instruction[1]
    const b = instruction[2]
    const store = instruction[3]
    switch (code) {
      case 1:
        sequence[store] = sequence[a] + sequence[b]
        break
      case 2:
        sequence[store] = sequence[a] * sequence[b]
        break
      case 99:
        return sequence
      default:
        throw Error("Something went wrong")
    }
  }
}

function partTwo(input) {
  const combos = []
  for (let x = 0; x <= 99; x++) {
    for (let y = 0; y <= 99; y++) {
      combos.push([x, y])
    }
  }
  combos.forEach(combo => {
    const success =
      compute(
        getSequence(input, combo[0], combo[1]),
        getInstructions(getSequence(input, combo[0], combo[1]))
      )[0] === 19690720
    if (success) {
      console.log(100 * combo[0] + combo[1])
    }
  })
}

partTwo(input)
