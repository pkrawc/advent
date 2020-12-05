const { readInput, test } = require("../../utils")
const { dequal } = require("dequal")

const testInput = `
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
`

const prepareInput = (rawInput) =>
  rawInput
    .trim()
    .split(/^\s*\n/gm)
    .map((i) => i.split(/\n|\s/).filter((i) => i.length))

const input = prepareInput(readInput())

const keys = Object.keys(validators)

const validators = {
  byr: (v) => v >= 1920 && v <= 2002,
  iyr: (v) => v >= 2010 && v <= 2020,
  eyr: (v) => v >= 2020 && v <= 2030,
  hgt: (v) => /^(59|6\d|7[0-6])in$|^1([5-8]\d|9[0-3])cm$/.test(v),
  hcl: (v) => /^#[a-f\d]{6}$/.test(v),
  ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
  pid: (v) => /^\d{9}$/.test(v),
}

function partOne(input) {
  const results = input.reduce((count, passport) => {
    const passportFields = passport.map((pass) => pass.split(":")[0])
    for (field in validators) {
      if (!passportFields.includes(field) && field !== "cid") return count
    }
    return count + 1
  }, 0)
  return results
}

function partTwo(input) {
  const re = new RegExp(`(${keys.join("|")}):\\S*`, "g")
  return input
    .map((line) => line.match(re).map((i) => i.split(":")))
    .filter((entry) =>
      keys.every((key) => key in entry && validators[key](entry[key]))
    ).length
}

/* Tests */

// const testInp = prepareInput(testInput)

// const result = partTwo(testInp)

// test(
//   partTwo(
//     prepareInput(
//       `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f`
//     )
//   ),
//   true
// )

// test(result, 4)

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
