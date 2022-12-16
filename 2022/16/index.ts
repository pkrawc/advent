import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

type Valve = {
  flowRate: number
  connections: string[]
}

type ValveMap = { [key: string]: Valve }

function buildValveMap(input) {
  const valveMap: ValveMap = {}
  for (const valve of input) {
    const [current, ...connections] = valve.match(/([A-Z]{2})/g)
    const flowRate = parseInt(valve.match(/flow rate=(\d+)/)[1])
    valveMap[current] = { flowRate, connections }
  }
  return valveMap
}

function buildTimeMap(valveMap: ValveMap) {
  const timeMap = {}
  const valveKeys = Object.keys(valveMap).filter(
    (name) => valveMap[name].flowRate > 0
  )
  valveKeys.push("AA")
  for (let key of Object.keys(valveMap)) {
    if (!valveKeys.includes(key)) {
      continue
    }
    const queue = [key]
    const distances = { [key]: 0 }
    const visited = new Set([key])
    while (queue.length > 0) {
      const current = queue.shift()
      for (let connection of valveMap[current].connections) {
        if (!visited.has(connection)) {
          visited.add(connection)
          distances[connection] = distances[current] + 1
          queue.push(connection)
        }
      }
    }
    timeMap[key] = distances
  }
  return [timeMap, valveKeys]
}

function partOne(input) {
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const testValves = buildValveMap(testInput)
const testTimes = buildTimeMap(testValves)

console.log(testTimes)
// test(testMap, 1000)

/* Results */

// console.log("-----------------")

// console.time("Part One Time")
// const partOneResult = partOne(input)
// console.timeEnd("Part One Time")
// console.log("Solution to part 1: ", partOneResult)

// console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")

export {}
