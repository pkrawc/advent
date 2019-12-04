const input = require("./inputs/day_4")

function dayFour(input) {
  const [beginning, end] = input.split(/-/).map(Number)
  const result = [0, 0]
  for (let count = beginning; count <= end; count++) {
    const digits = `${count}`.split("").map(Number)
    const groups = []
    let decrease = false
    digits.reduce((prev, curr) => {
      prev === curr ? groups[groups.length - 1]++ : groups.push(1)
      curr < prev && (decrease = true)
      return curr
    }, -1)

    if (!decrease) {
      if (groups.some(group => group >= 2)) result[0]++
      if (groups.some(group => group === 2)) result[1]++
    }
  }
  return result
}

console.log(dayFour(input))

module.exports = dayFour
