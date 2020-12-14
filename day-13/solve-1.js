const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n")
const target = parseInt(lines[0])
const ids = lines[1].split(",").map(e => parseInt(e)).filter(Boolean)

let best = { delta: Infinity, id: -1 }

for (let id of ids) {
    const delta = Math.ceil(target / id) * id - target

    if (delta <= best.delta) {
        best = { delta, id }
    }
}

console.log(best.delta * best.id)