const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const lines = input.split("\n")
const chunks = []

let currentChunk = []
for (let line of lines) {
    if (line === "") {
        chunks.push(currentChunk.join(" "))
        currentChunk = []
    } else {
        currentChunk.push(line)
    }
}

let valid = 0

for (let chunk of chunks) {
    let isValid = true

    for (let key of keys) {
        if (!new RegExp(`${key}:`).test(chunk)) {
            isValid = false
            break
        }
    }

    if (isValid) {
        valid++
    }
}

console.log(valid)