import { readInput, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n\n/).map((v) => v.split(/\n/))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function partOne(input: string[][]) {
  const [ranges, ids] = input
  let freshCount = 0
  for (let id of ids) {
    const numId = Number(id)
    const fresh = ranges.some((range) => {
      let [lower, upper] = range.split("-").map(Number)
      return lower <= numId && upper >= numId
    })
    if (fresh) freshCount++
  }
  return freshCount
}

function partTwo(input: string[][]) {
  const freshIds = new Set()
  const ranges = input[0].map((range) => {
    const [lower, upper] = range.split("-").map(BigInt)
    return { start: lower, end: upper }
  })
  const sortedRanges = ranges.sort((a, b) => {
    return a.start < b.start ? -1 : a.start > b.start ? 1 : 0
  })

  const mergedRanges: { start: bigint; end: bigint }[] = []
  for (let range of sortedRanges) {
    if (mergedRanges.length === 0) {
      mergedRanges.push({ ...range })
    } else {
      const lastRange = mergedRanges[mergedRanges.length - 1]
      if (range.start <= lastRange.end + 1n) {
        if (range.end > lastRange.end) {
          lastRange.end = range.end
        }
      } else {
        mergedRanges.push({ ...range })
      }
    }
  }
  let total = 0n
  for (let range of mergedRanges) {
    total += range.end - range.start + 1n
  }
  return total
}

/* Tests */

test(partOne(testInput), 3)
test(partTwo(testInput), 14n)

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

time(timer("Part Two Time"))
const partTwoResult = partTwo(input)
timeEnd(timer("Part Two Time"))
log(success("Solution to part 2: ", partTwoResult))

log(seperator)
