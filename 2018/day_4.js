const input = require("./inputs/day_4")

function sort(text) {
  const rows = text.split(/\n/)
  let currentId = null
  const entries = rows.map(e => {
    const [dateTime, entry] = e.split(/\]/)
    const [date, time] = dateTime.substring(1).split(" ")
    return { date: date, time: time, text: entry.trim() }
  })
  const output = entries
    .sort(
      (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
    )
    .map((entry, idx) => {
      if (idx === 0) currentId = entry.text.split(" ")[1]
      if (/^Guard/.test(entry.text) && currentId !== entry.text.split(" ")[1])
        currentId = entry.text.split(" ")[1]
      return { ...entry, id: currentId }
    })
  return output
}

function getGuards(input) {
  const output = new Map()
  input.forEach(({ text }) => {
    if (/^Guard/.test(text)) {
      const id = text.split(" ")[1]
      if (!output.has(id)) {
        output.set(id, 0)
      }
    }
  })
  return output
}

function run(input) {
  const sortedInput = sort(input)
  const guards = getGuards(sortedInput)
  sortedInput.forEach(({ time, text, id }) => {
    const newShift = /^Guard/.test(text)
    if (!newShift) {
      const mins = Number(time.split(":")[1])
      guards.set(id, guards.get(id) + mins)
    }
  })
  console.log(guards)
}

run(input)
