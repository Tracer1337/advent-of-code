const fs = require("fs")
const path = require("path")

const MATCH_CHAR = "#"

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const lines = input.split("\n")

let x = 0
let y = 0
let matches = 0

while(y < lines.length) {
    const field = lines[y][x % lines[y].length]

    if (field === MATCH_CHAR) {
        matches++
    }

    x += 3
    y += 1
}

console.log(matches)