import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split("\n")

const input = prepareInput(readInput())

function buildTreeGrid(input) {
  const cellMap = new Map<string, { height: number; visible: boolean | null }>()

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      cellMap.set(`${x},${y}`, { height: parseInt(input[y][x]), visible: null })
    }
  }
  // [grid, height, width]
  return { cells: cellMap, height: input.length, width: input[0].length }
}

function checkVisibility({ cells, width, height }) {
  for (let [coords, { height: treeHeight }] of cells.entries()) {
    const [x, y] = coords.split(",").map((n) => parseInt(n))
    const linesOfSight = {
      top: [],
      bottom: [],
      left: [],
      right: [],
    }

    // Right
    for (let r = x + 1; r < width; r++) {
      linesOfSight.right.push(cells.get(`${r},${y}`).height)
    }

    // Left
    for (let l = x - 1; l >= 0; l--) {
      linesOfSight.left.push(cells.get(`${l},${y}`).height)
    }

    // Top
    for (let t = y - 1; t >= 0; t--) {
      linesOfSight.top.push(cells.get(`${x},${t}`).height)
    }

    // Bottom
    for (let b = y + 1; b < height; b++) {
      linesOfSight.bottom.push(cells.get(`${x},${b}`).height)
    }

    const linesArray = Object.values(linesOfSight)

    const visible = linesArray
      .map((lines) => {
        return lines.every((h) => {
          return h < treeHeight
        })
      })
      .some((v) => v)

    const scenicScores = linesArray.map((line) => {
      let score = 0
      for (let item of line) {
        if (item < treeHeight) {
          score += 1
        } else if (item <= treeHeight) {
          score += 1
          break
        } else {
          score += 1
          break
        }
      }
      return score
    })

    const scenicScore = scenicScores.reduce((a, b) => a * b)
    // console.log({
    //   coords: `${x},${y}`,
    //   scenicScore,
    //   linesArray,
    //   scenicScores,
    //   treeHeight,
    // })

    cells.set(`${x},${y}`, { ...cells.get(`${x},${y}`), visible, scenicScore })
  }
  return {
    visibleTrees: Array.from(cells.values()).filter(
      (cell: { visible: boolean }) => cell.visible
    ).length,
    scenicScore: Array.from(cells.values()).sort(
      // @ts-ignore
      (a, b) => b.scenicScore - a.scenicScore
      // @ts-ignore
    )[0].scenicScore,
  }
}

function partOne(input) {
  const grid = buildTreeGrid(input)
  const { visibleTrees } = checkVisibility(grid)
  return visibleTrees
}

function partTwo(input) {
  const grid = buildTreeGrid(input)
  const { scenicScore } = checkVisibility(grid)
  return scenicScore
}

/* Tests */

// const testInput = prepareInput(readInput("test-input.txt"))

// const testGrid = buildTreeGrid(testInput)

// const { visibleTrees, scenicScore } = checkVisibility(testGrid)

// test(visibleTrees, 21)

// test(scenicScore, 8)

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
