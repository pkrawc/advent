import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split("\n")

const input = prepareInput(readInput())

const testInput = prepareInput(readInput("test-input.txt"))

function getDirectories(input: string[]) {
  const path = []
  const fileMap = new Map<string, number>()
  const dirMap = new Map([["root", 0]])
  for (let command of input) {
    if (command.startsWith("$ cd")) {
      let dir = command.split(" ")[2]
      if (dir === "/") dir = "root"
      dir === ".." ? path.pop() : path.push(dir)
      continue
    }
    if (command.match(/^\d/)) {
      const [size, name] = command.split(" ")
      fileMap.set(path.join("/") + `/${name}`, parseInt(size))
    }
    if (command.match(/dir/)) {
      const name = command.split(" ")[1]
      dirMap.set(path.join("/") + `/${name}`, 0)
    }
  }
  // return fileMap
  return Array.from(dirMap).map(([dirKey, size]) => {
    console.log(dirKey)
    const files = Array.from(fileMap).filter(([key]) => key.includes(dirKey))
    const dirSize = files.reduce((acc, curr) => acc + curr[1], size)
    return { path: dirKey, size: dirSize, files }
  })
}

function partOne(input: string[]) {
  const directories = getDirectories(input).filter((dir) => dir.size <= 100000)
  console.log(directories.map((dir) => dir.path))
  return directories.reduce((acc, curr) => acc + curr.size, 0)
}

function partTwo(input) {
  return input
}

/* Tests */

// const directories = getSystem(testInput)
// console.log(directories)
// test(
//   directories
//     .filter((dir) => dir.size <= 100000)
//     .reduce((acc, curr) => acc + curr.size, 0),
//   95437
// )

/* Results */

console.log("-----------------")

console.time("Part One Time")
const partOneResult = partOne(input)
console.timeEnd("Part One Time")
console.log("Solution to part 1: ", partOneResult)

console.log("-----------------")

// console.time("Part Two Time")
// const partTwoResult = partTwo(input)
// console.timeEnd("Part Two Time")
// console.log("Solution to part 2: ", partTwoResult)

// console.log("-----------------")

export {}
