const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
let lines = input.split("\n").map(line => line.replace("\r", "").split(""))

function simulate(lines) {
    let hasChanged = false
    const newLines = [...lines].map(l => [...l])

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === ".") {
                continue
            }

            let adjacentMarked = 0

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) {
                        continue
                    }
                 
                    if (lines[y + dy] && lines[y + dy][x + dx] === "#") {
                        adjacentMarked++
                    }
                }
            }

            if (adjacentMarked === 0 && newLines[y][x] !== "#") {
                newLines[y][x] = "#"
                hasChanged = true
            }

            if (adjacentMarked >= 4 && newLines[y][x] !== "L") {
                newLines[y][x] = "L"
                hasChanged = true
            }
        }
    }

    return [newLines, hasChanged]
}

function count(lines) {
    return lines.reduce((sum, line) => {
        return sum += line.reduce((sum, char) => {
            return char === "#" ? sum += 1 : sum
        }, 0)
    }, 0)
}

let hasChanged = true

while (hasChanged) {
    [lines, hasChanged] = simulate(lines)
}

console.log(count(lines))
