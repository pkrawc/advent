import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) =>
    line.split(": ").map((s) => {
      return s.match(/-?(\d+)/g).map(Number)
    })
  )

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function getDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function launchSensors(input) {
  return input.map(([[sx, sy], [bx, by]]) => ({
    sensor: { x: sx, y: sy },
    closestBeacon: { x: bx, y: by },
    distance: getDistance(sx, sy, bx, by),
  }))
}

function partOne(input) {
  const sensors = launchSensors(input)
  const y = 2000000
  const noBeacon = new Set()
  const beaconsOnPlane = new Set()
  for (let { sensor, closestBeacon, distance } of sensors) {
    // console.log(sensor, closestBeacon, distance)
    if (closestBeacon.y === y) {
      beaconsOnPlane.add(closestBeacon.x)
    }
    const fromLine = getDistance(sensor.x, sensor.y, sensor.x, y)
    if (fromLine <= distance) {
      const lineCovered = distance - fromLine
      for (let x = sensor.x - lineCovered; x <= sensor.x + lineCovered; x++) {
        noBeacon.add(x)
      }
    }
  }

  return noBeacon.size - beaconsOnPlane.size
}

function partTwo(input) {
  const sensors = launchSensors(input)
  const max = 4000000
  let result = null
  for (let y = 0; y < max; y++) {
    for (let x = 0; x < max; x++) {
      let isolated = true
      for (const { sensor, distance } of sensors) {
        if (getDistance(x, y, sensor.x, sensor.y) <= distance) {
          isolated = false
          break
        }
      }
      if (isolated) {
        return (result = x * 4000000 + y)
      }
    }
  }
}

/* Tests */

// const twoTest = partTwo(testInput)

// test(twoTest, 26)

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
