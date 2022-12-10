import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) =>
  rawInput.split(/\n/).map((l) => l.split(" "))

// const input = prepareInput(readInput())

function moveDirection(movement, axis, steps, hx, hy, tx, ty, set) {
  for (let step = 1; step < steps; step++) {
    hx = hx + 1
    // Move Diagonally
    if (ty !== hy && tx !== ty) {
      tx = tx + 1
      ty = hx - tx
    } else {
      tx = tx + 1
    }
    set.add(`${tx},${ty}`)
  }
}

function isTouching(hx, hy, tx, ty) {
  return Math.abs(tx - hx) <= 1 && Math.abs(ty - hy) <= 1
}

function move(hx, hy, tx, ty) {
  if (false) {
  }
}

function mapTailMovement(input) {
  const visited = new Set()
  let [tx, ty] = [0, 0]
  let [hx, hy] = [0, 0]
  for (let [direction, steps] of input) {
    console.log({ direction, steps })
    switch (direction) {
      case "R": {
        for (let step = 0; step < steps; step++) {
          hx = hx + 1

          // Check for touching

          // Make touching

          // Add to visited
        }
      }
      case "U": {
        for (let step = 0; step < steps; step++) {
          hy = hy - 1
          // Check for touching

          // Make touching

          // Add to visited
        }
      }
      case "L": {
        for (let step = 0; step < steps; step++) {
          hx = hx - 1
          // Check for touching

          // Make touching

          // Add to visited
        }
      }
      case "D": {
        for (let step = 0; step < steps; step++) {
          hy = hy + 1
          // Check for touching

          // Make touching

          // Add to visited
        }
      }
    }
  }
  return visited
}

// function partOne(input) {
//   return input
// }

// function partTwo(input) {
//   return input
// }

/* Tests */

const testInput = prepareInput(readInput("test-input.txt"))

const result = mapTailMovement(testInput)

console.log(result)

test(result.size, 13)

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
