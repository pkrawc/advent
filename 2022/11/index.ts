import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n\n/).map((m) => m.split(/\n/))

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

class Monkey {
  id: string
  items: number[]
  operation: string
  denominator: number
  to: [string, string]
  inspectedCount: number
  constructor({ id, startingItems, operation, denominator, to }) {
    this.id = id
    this.items = startingItems.map((i) => parseInt(i))
    this.operation = operation
    this.denominator = denominator
    this.to = to
    this.inspectedCount = 0
  }

  inspect() {
    const oldItem = this.items.shift()
    const test = this.operation.replace(/old/g, `${oldItem}`)
    const newItem = eval(test)
    this.inspectedCount++
    return newItem
  }

  yoink(item) {
    this.items.push(item)
  }
}

function setUpMonkeys(input) {
  const monkeyMap = new Map<string, Monkey>()
  for (let testCase of input) {
    const id = testCase[0].match(/(\d+)/)[1]
    const startingItems = testCase[1].match(/(\d+)/g)
    const operation = testCase[2].split(" = ")[1]
    const denominator = parseInt(testCase[3].match(/(\d+)/g)[0])
    const trueThrow = testCase[4].match(/(\d+)/g)[0]
    const falseThrow = testCase[5].match(/(\d+)/g)[0]
    monkeyMap.set(
      id,
      new Monkey({
        id,
        startingItems,
        operation,
        denominator,
        to: [trueThrow, falseThrow],
      })
    )
  }
  return monkeyMap
}

function getCommon(monkeys: Map<string, Monkey>) {
  return Array.from(monkeys.values()).reduce((total, monkey) => {
    return total * monkey.denominator
  }, 1)
}

function simulate(input: string[][], rounds: number, divisor: number) {
  const monkeys = setUpMonkeys(input)

  // We still need the throw test to work, but have to reduce numbers somehow.
  // BigInt on everything doesn't work. At least, I can't figure out how to test accurately.
  // Get a common divisor for all the monkeys before we start the simulation.
  const stressManager = getCommon(monkeys)
  let round = 1

  while (round <= rounds) {
    for (let monkey of monkeys.values()) {
      while (monkey.items.length) {
        const newItem = Math.floor(monkey.inspect() / divisor) % stressManager
        let catcher
        if (newItem % monkey.denominator === 0) {
          catcher = monkeys.get(monkey.to[0])
        } else {
          catcher = monkeys.get(monkey.to[1])
        }
        catcher.yoink(newItem)
      }
    }
    round++
  }

  const sorted = Array.from(monkeys.values()).sort(
    (a, b) => b.inspectedCount - a.inspectedCount
  )

  return sorted[0].inspectedCount * sorted[1].inspectedCount
}

function partOne(input) {
  return simulate(input, 20, 3)
}

function partTwo(input) {
  return simulate(input, 10000, 1)
}

/* Tests */

// const testMonkeys = setUpMonkeys(testInput)

// const partOneTest = simulate(testInput, 20, 3)
// const partTwoTest = simulate(testInput, 10000, 1)

// test(partOneTest, 10605)
// test(partTwoTest, 2713310158)

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

export {}
