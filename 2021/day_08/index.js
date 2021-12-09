const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) =>
  rawInput
    .split(/\n/)
    .map((line) => line.split(" | "))
    .map(([signal, output]) => {
      return { signal: signal.split(" "), output: output.split(" ") }
    })

const input = prepareInput(readInput())

const digitPatterns = {
  acedgfb: 8,
  cdfbe: 5,
  gcdfa: 2,
  fbcad: 3,
  dab: 7,
  cefabd: 9,
  cdfgeb: 6,
  eafb: 4,
  cagedb: 0,
  ab: 1,
}

function partOne(input) {
  let countOfEasyDigits = 0
  for (const line of input) {
    line.output.forEach((digit) => {
      const l = digit.length
      if (l === 2 || l === 3 || l === 4 || l === 7) {
        countOfEasyDigits++
      }
    })
  }
  return countOfEasyDigits
}

function partTwo(input) {
  return
}

/* Tests */

const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

test(partOne(prepareInput(testInput)), 26)

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
