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

                    if (findSeat(lines, x + dx, y + dy, dx, dy) === "#") {
                        adjacentMarked++
                    }
                }
            }

            if (adjacentMarked === 0 && newLines[y][x] !== "#") {
                newLines[y][x] = "#"
                hasChanged = true
            }

            if (adjacentMarked >= 5 && newLines[y][x] !== "L") {
                newLines[y][x] = "L"
                hasChanged = true
            }
        }
    }

    return [newLines, hasChanged]
}

function findSeat(lines, x, y, dx, dy) {
    while (y >= 0 && y < lines.length && x >= 0 && x < lines[0].length) {
        if (lines[y][x] === "#" || lines[y][x] === "L") {
            return lines[y][x]
        }
        
        y += dy
        x += dx
    }

    return null
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