const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const keys = {
    "byr": (value) => /^\d{4}$/.test(value) && parseInt(value) >= 1920 && parseInt(value) <= 2002,
    "iyr": (value) => /^\d{4}$/.test(value) && parseInt(value) >= 2010 && parseInt(value) <= 2020,
    "eyr": (value) => /^\d{4}$/.test(value) && parseInt(value) >= 2020 && parseInt(value) <= 2030,
    "hgt": (value) => {
        if (/^\d+cm$/.test(value)) {
            return parseInt(value) >= 150 && parseInt(value) <= 193
        }
        if (/^\d+in$/.test(value)) {
            return parseInt(value) >= 59 && parseInt(value) <= 76
        }
        return false
    },
    "hcl": (value) => /^#[a-f0-9]{6}$/.test(value),
    "ecl": (value) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
    "pid": (value) => /^\d{9}$/.test(value)
}

const lines = input.split("\n")
const chunks = []

let currentChunk = []
for (let line of lines) {
    if (line === "" || line === "\r" || line === "\n") {
        chunks.push(currentChunk.join(" "))
        currentChunk = []
    } else {
        currentChunk.push(line.replace("\r", ""))
    }
}

let valid = 0

for (let chunk of chunks) {
    let isValid = true

    for (let key in keys) {
        const match = chunk.match(new RegExp(`${key}:(\\S+)`))
        const value = match ? match[1] : ""

        if (!new RegExp(`${key}:`).test(chunk) || !keys[key](value)) {
            isValid = false
            break
        }
    }

    if (isValid) {
        valid++
    }
}

console.log(valid)