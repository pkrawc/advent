const { readInput, test } = require("../../utils")

const testInput = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`

const prepareInput = (rawInput) => rawInput.trim().split(/\n/)

const input = prepareInput(readInput())

function compile(input, loop = true) {
  let acc = 0
  let index = 0
  let repeat = false
  const visited = new Set()
  while (index < input.length || repeat) {
    if (visited.has(index)) {
      if (loop) return false
      else {
        repeat = true
        continue
      }
    }
    const [inst, arg] = input[index].split(" ")
    visited.add(index)
    switch (inst) {
      case "nop":
        index++
        break
      case "acc":
        acc += parseInt(arg)
        index++
        break
      case "jmp":
        index += parseInt(arg)
        break
      default:
        throw Error(`unexpected instruction ${inst}`)
    }
  }
  return acc
}

function partOne(input) {
  return compile(input, false)
}

function partTwo(input) {
  for (let idx = 0; idx < input.length; idx++) {
    let result = false
    const [inst, arg] = input[idx].split(" ")
    const test = [...input]
    if (inst === "jmp") {
      test[idx] = `nop ${arg}`
      result = compile(test)
    }
    if (inst === "nop") {
      test[idx] = `jmp ${arg}`
      result = compile(test)
    }
    if (result) return result
  }
  return "Didn't work"
}

/* Tests */

// const testResult = compile(prepareInput(testInput))

// test(testResult, 5)

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
