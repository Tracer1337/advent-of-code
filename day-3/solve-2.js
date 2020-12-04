const fs = require("fs")
const path = require("path")

const MATCH_CHAR = "#"

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const lines = input.split("\n")

function getMatches(dy, dx) {
    let x = 0
    let y = 0
    let matches = 0

    while (y < lines.length) {
        const field = lines[y][x % lines[y].length]

        if (field === MATCH_CHAR) {
            matches++
        }

        x += dy
        y += dx
    }

    return matches
}


const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]

const result = slopes.reduce((product, current) => product * getMatches(...current), 1)

console.log(result)