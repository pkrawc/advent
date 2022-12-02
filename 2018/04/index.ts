import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").sort((a, b) => {
    const [aDate] = a.split("]")
    const [bDate] = b.split("]")
    return aDate > bDate ? 1 : -1
  })

const input = prepareInput(readInput())

function partOne(input) {
  const trackedGuards = trackGuards(input)
  const sleepiestGuard = Object.entries(trackedGuards).sort(
    (a, b) => b[1].total - a[1].total
  )[0]
  const sleepiestMinute = Object.entries(sleepiestGuard[1].minutes).sort(
    (a, b) => b[1] - a[1]
  )[0]
  return parseInt(sleepiestGuard[0]) * parseInt(sleepiestMinute[0])
}

function partTwo(input) {
  const trackedGuards = Object.entries(trackGuards(input)).sort((a, b) => {
    const aMax = Object.values(a[1].minutes).sort((a, b) => b - a)[0]
    const bMax = Object.values(b[1].minutes).sort((a, b) => b - a)[0]
    return bMax - aMax
  })
  const sleepiestGuard = trackedGuards[0]
  const sleepiestMinute = Object.entries(sleepiestGuard[1].minutes).sort(
    (a, b) => b[1] - a[1]
  )[0]
  return parseInt(sleepiestGuard[0]) * parseInt(sleepiestMinute[0])
}

/* Tests */

const testInput = prepareInput(`[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`)

function trackGuards(input) {
  const guards: {
    [id: string]: { total: number; minutes: { [minute: string]: number } }
  } = {}
  let currentGuard = null
  let sleepTime = null
  console.log({ input })
  input.forEach((line: string) => {
    const [date, action] = line.split("] ")
    const guardMatch = action.match(/guard #(\d+) begins shift/i)
    const sleepMatch = action.match(/falls asleep/i)
    const wakeMatch = action.match(/wakes up/i)
    if (guardMatch) {
      currentGuard = guardMatch[1]
      if (!guards[currentGuard]) {
        guards[currentGuard] = { total: 0, minutes: {} }
      }
    } else if (sleepMatch) {
      sleepTime = parseInt(date.split(":")[1])
    } else if (wakeMatch) {
      const wakeTime = parseInt(date.split(":")[1])
      guards[currentGuard].total += wakeTime - sleepTime
      for (let idx = sleepTime; idx < wakeTime; idx++) {
        guards[currentGuard].minutes[idx] =
          (guards[currentGuard].minutes[idx] || 0) + 1
      }
    }
  })

  return guards
}

// const sleepiestGuard = Object.entries(trackGuards(testInput)).sort(
//   (a, b) => b[1].total - a[1].total
// )[0]

// const sleepiestMinute = Object.entries(sleepiestGuard[1].minutes).sort(
//   (a, b) => b[1] - a[1]
// )[0]

// test(parseInt(sleepiestGuard[0]) * parseInt(sleepiestMinute[0]), 240)

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
