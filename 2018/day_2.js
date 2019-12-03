const input = require("./inputs/day_2")

const checkDups = (id, length) => {
  const letters = id.split("")
  let match = 0
  for (index in letters) {
    const dups = letters.filter(letter => letter === letters[index])
    if (dups.length === length) match += 1
  }
  return match ? 1 : 0
}

const partOne = input => {
  const ids = input.split(/\n/g)
  let twoMatch = 0
  let threeMatch = 0
  for (const id of ids) {
    const twos = checkDups(id, 2)
    const threes = checkDups(id, 3)
    twoMatch += twos
    threeMatch += threes
  }
  return twoMatch * threeMatch
}

const partTwo = input => {
  const ids = input.split(/\n/g)
  for (let id of ids) {
    const lettersA = id.split("")
    for (let index = ids.indexOf(id) + 1; index < ids.length; index++) {
      const lettersB = ids[index].split("")
      const diff = lettersA.reduce((a, c, i) => a + (c === lettersB[i] ? 0 : 1), 0)
      if (diff === 1) return [lettersA.join(""), lettersB.join("")]
    }
  }
}

console.log(partOne(input))
console.log(partTwo(input))
