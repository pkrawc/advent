import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

// const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

function parseBlueprints(input) {
  return input.map((line) => {
    const [id, ...costs] = line.match(/(\d+)/g)

    const [ore, clayOre, obsidianOre, obsidianClay, geodeOre, geodeObsidian] =
      costs.map(Number)

    return {
      id,
      ore,
      clayOre,
      obsidianOre,
      obsidianClay,
      geodeOre,
      geodeObsidian,
    }
  })
}

function partOne(input) {
  const totals = []
  const blueprints = parseBlueprints(input)
  for (const blueprint of blueprints) {
    let minute = 1
    const materials = {
      geode: 0,
      obsidian: 0,
      clay: 0,
      ore: 0,
    }
    const bots = {
      geode: 0,
      obsidian: 0,
      clay: 0,
      ore: 1,
    }
    while (minute < 10) {
      const newBots = {
        geode: 0,
        obsidian: 0,
        clay: 0,
        ore: 0,
      }
      if (
        blueprint.geodeOre <= materials.ore &&
        blueprint.geodeObsidian <= materials.obsidian
      ) {
        materials.ore -= blueprint.geodeOre
        materials.obsidian -= blueprint.geodeObsidian
        newBots.geode++
      }
      if (
        blueprint.obsidianOre <= materials.ore &&
        blueprint.obsidianClay <= materials.clay
      ) {
        materials.ore -= blueprint.obsidianOre
        materials.clay -= blueprint.obsidianClay
        newBots.obsidian++
      }
      if (blueprint.clayOre <= materials.ore) {
        materials.ore -= blueprint.clayOre
        newBots.clay++
      }
      if (blueprint.ore <= materials.ore) {
        materials.ore -= blueprint.ore
        newBots.ore++
      }
      // if (Object.values(newBots).some(Boolean)) minute++
      for (const [key, count] of Object.entries(bots)) {
        materials[key] += count
        bots[key] = count + newBots[key]
      }
      console.log({ bots, materials, minute })
      minute++
    }
  }
  return totals
}

function partTwo(input) {
  return input
}

/* Tests */

const result = partOne(testInput)

console.log(result)

// test(result, expected)

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
