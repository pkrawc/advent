import { readInput, test } from "@utils"

const prepareInput = (rawInput: string) => rawInput.split(/\n/)

const input = prepareInput(readInput())
const testInput = prepareInput(readInput("test-input.txt"))

class Room {
  name: string
  flowRate: number
  constructor(name, flowRate) {
    this.name = name
    this.flowRate = flowRate
  }
}

class ValveMap {
  nodes: Room[]
  edges: string[][]
  constructor() {
    this.nodes = []
    this.edges = []
  }

  getNode(name) {
    return this.nodes.find((n) => n.name === name)
  }

  addNode(node, connections) {
    this.nodes.push(node)
    this.edges[node.name] = []
    for (let connection of connections) {
      const connectionNode = this.getNode(connection)
      this.edges[node.name].push(connectionNode.name)
      if (connectionNode) {
        this.edges[connectionNode.name].push(node.name)
      } else {
        this.edges[connectionNode.name] = [node.name]
      }
    }
  }
}

function buildValveMap(input) {
  const valveMap = new ValveMap()
  for (const valve of input) {
    const [current, ...connections] = valve.match(/([A-Z]{2})/g)
    const flowRate = parseInt(valve.match(/flow rate=(\d+)/)[1])
    const node = new Room(current, flowRate)
    valveMap.addNode(node, connections)
  }
  console.log(valveMap)
  return valveMap
}

function partOne(input) {
  return input
}

function partTwo(input) {
  return input
}

/* Tests */

const testResult = buildValveMap(testInput)

test(testResult, 1000)

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
