const input = require("./inputs/day_1")

function calc(mass) {
  return Math.floor(Number(mass) / 3) - 2
}

function dayOne(input) {
  function sum(a, b) {
    return Number(a) + Number(b)
  }

  function getFuel(mass) {
    let totalFuel = 0
    let newFuel = calc(mass)
    while (newFuel > 0) {
      totalFuel += newFuel
      newFuel = calc(newFuel)
    }
    return totalFuel
  }

  const fuelList = input.map(mass => {
    return getFuel(mass)
  })

  return fuelList.reduce(sum, 0)
}

console.log(dayOne(input.split(/\n/)))
