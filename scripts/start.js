const { spawn } = require("child_process")
const { readdirSync, existsSync } = require("fs")
const { cp, mkdir } = require("shelljs")

const year = process.argv[2]
const day = process.argv[3]

if (!existsSync(`./${year}`)) {
  mkdir(`${year}`)
}

const days = readdirSync(`./${year}`)

if (!days.includes(day)) {
  console.log(`Creating file structure for ${day}...`)
  cp("-r", "template", `${year}/${day}`)
}

spawn("nodemon", [`${year}/${day}/index.js`], {
  stdio: "inherit",
})
