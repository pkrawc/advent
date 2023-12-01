import { spawn } from "child_process"
import { readdirSync, existsSync } from "fs"
import { cp, mkdir } from "shelljs"

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

spawn("tsx", ["watch", `${year}/${day}/index.ts`], {
  stdio: "inherit",
})

export {}
