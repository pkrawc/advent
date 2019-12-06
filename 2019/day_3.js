const input = require("./inputs/day_3")

function format(input) {
  return input.split(/\n/).map(wire => wire.split(/,/))
}

function buildPath(wire) {
  const positions = new Map()
  let moves = 0
  const current = { x: 0, y: 0 }
  for (let instruction of wire) {
    const direction = instruction.substring(0, 1)
    const steps = Number(instruction.substring(1))
    for (let step = 0; step < steps; step++) {
      current.x += direction === "L" ? -1 : direction === "R" ? 1 : 0
      current.y += direction === "U" ? -1 : direction === "D" ? 1 : 0
      positions.set(`${current.x},${current.y}`, ++moves)
    }
  }
  return positions
}

function partTwo(input) {
  const [one, two] = format(input).map(wire => buildPath(wire))
  const wireArray = [...two.entries()]
  // console.log(wireArray)
  return wireArray
    .filter(([position]) => one.has(position))
    .map(([position, steps]) => one.get(position) + steps)
    .sort((a, b) => a - b)[0]
}

module.exports = {
  format,
  buildPath,
}
