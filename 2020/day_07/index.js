const { lookup } = require("dns")
const { readInput, test } = require("../../utils")

const prepareInput = (rawInput) => rawInput.trim().split(/\n/)

const input = prepareInput(readInput())

const testInput = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`

function getRegulations(input) {
  return input.reduce((tree, reg) => {
    const [p, c] = reg.split("contain")

    const parent = p.replace(/bags/, "").trim()

    if (c.trim() === "no other bags.") {
      return tree
    }

    const children = c
      .replace(".", "")
      .split(",")
      .map((child) => {
        const childRegex = /(\d) (\w+ \w+) bag[s.]?/g
        const [match, number, bagType] = childRegex.exec(child)
        return { color: bagType, number }
      })
      .reduce((innerTree, child) => {
        return {
          ...innerTree,
          [child.color]: child.number,
        }
      }, {})
    return {
      ...tree,
      [parent]: children,
    }
  }, {})
}

function partOne(input) {
  const rules = getRegulations(input)
  const result = new Set()
  const search = ["shiny gold"]
  while (search.length > 0) {
    const find = search.pop()
    Object.keys(rules).forEach((bag) => {
      const contains = Object.keys(rules[bag])
      if (contains.includes(find)) {
        search.push(bag)
        result.add(bag)
      }
    })
  }
  return result.size
}

function partTwo(input) {
  const rules = getRegulations(input)
  let result = 0
  const searchList = [["shiny gold", 1]]
  while (searchList.length > 0) {
    const [searchColor, number] = searchList.pop()
    if (!rules[searchColor]) continue
    Object.keys(rules[searchColor]).forEach((child) => {
      const count = parseInt(rules[searchColor][child]) * number
      result += count
      searchList.push([child, count])
    })
  }
  return result
}

/* Tests */

// const rules = getRegulations(prepareInput(testInput))

// console.log(rules)

// test(3, 4)

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
