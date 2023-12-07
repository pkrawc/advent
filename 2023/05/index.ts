import { readInput, test } from "@utils"
import chalk from "chalk"

type Almanac = {
  seeds: number[]
  maps: number[][][]
}

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n\n/).reduce(
    (almanac, cLine, cIdx) => {
      if (cIdx === 0) {
        return { ...almanac, seeds: cLine.match(/\d+/g).map(Number) }
      }
      const [_, rule] = cLine.split(/\:\n/)
      return {
        ...almanac,
        maps: [
          ...almanac.maps,
          rule
            .split(/\n/)
            .map((range) => range.match(/\d+/g).map((n) => parseInt(n))),
        ],
      }
    },
    { maps: [], seeds: [] }
  )

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function mapRange(input, maps) {
  if (!maps.length) return input
  const ranges: number[][] = maps.shift()

  const output = []
  for (let seed of input) {
    let mapped = false
    for (let [destination, source, length] of ranges) {
      if (mapped) continue
      if (seed >= source && seed < source + length) {
        seed = destination + (seed - source)
        mapped = true
      }
    }
    output.push(seed)
  }
  return mapRange(output, maps)
}

function partOne(input) {
  const { seeds, maps } = input
  const output = mapRange(seeds, maps)
  return Math.min(...output)
}

function partTwo(input: Almanac) {
  const { seeds, maps } = input

  const mins = new Set<number>()

  // Brute force does not work...
  while (seeds.length) {
    const start = seeds.shift()
    const length = seeds.shift()
    const range = Array.from({ length }, (_, i) => start + i)
    const output = mapRange(range, maps).sort((a, b) => a - b)
    console.log(output[0])
  }

  return Math.min(...Array.from(mins))
}

/* Tests */

// const result = mapSeeds(testInput)

// test(result, 35)

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

export {}
