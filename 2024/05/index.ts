import { readInput, sum, test } from "@utils"
import chalk from "chalk"

const prepareInput = (rawInput: string) => rawInput.split(/\n\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function checkUpdate(update, rules, reorder = false, corrected = false) {
  let correct = true
  for (const page of update) {
    const validRules = rules.filter(rule => rule.some(n => n === page))
    for (let rule of validRules) {
      const pageLocation = update.findIndex(n => n === page)
      if (rule[0] === page) {
        // page needs to come before rule[1]
        const ruleLocation = update.findIndex(n => n === rule[1])
        if (pageLocation > ruleLocation && ruleLocation !== -1) {
          correct = false
          if (reorder) {
            const newUpdate = update.toSpliced(pageLocation, 1).toSpliced(ruleLocation, 0, page)
            return checkUpdate(newUpdate, rules, true, true)
          }
          break
        }
      }
    }
  }
  return {correct, corrected, update}
}


function partOne(input) {
  const orderingRules = input[0].split(/\n/).map(rule => rule.split("|").map(n => parseInt(n)))
  const updates = input[1].split(/\n/).map(line => line.split(",").map(n => parseInt(n)))
  const correctOrders = []

  for (const update of updates) {
    const {correct} = checkUpdate(update, orderingRules)
    if (correct) {
      correctOrders.push(update)
    }
  }
  return sum(correctOrders.map(arr => arr[(arr.length - 1) / 2]))
}

function partTwo(input) {
  const orderingRules = input[0].split(/\n/).map(rule => rule.split("|").map(n => parseInt(n)))
  const updates = input[1].split(/\n/).map(line => line.split(",").map(n => parseInt(n)))
  const correctedArr = []

  for (const update of updates) {
    let {update: newUpdate, corrected} = checkUpdate(update, orderingRules, true)
    if (corrected) {
      correctedArr.push(newUpdate)
    }
  }
  return sum(correctedArr.map(arr => arr[(arr.length - 1) / 2]))
}

/* Tests */

const resultOne = partOne(testInput)
const resultTwo = partTwo(testInput)

test(resultOne, 143)
test(resultTwo, 123)

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
