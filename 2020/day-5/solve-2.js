const fs = require("fs")
const path = require("path")
const Decoder = require("./Decoder.js")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const lines = input.split("\n")

const ids = lines.map(line => new Decoder(line).getId())

for (let id of ids) {
    const check = id => {
        if (ids.includes(id + 1) && ids.includes(id - 1)) {
            console.log(id)
            return true
        }
    }

    let shouldBreak = false

    if (!ids.includes(id - 1)) {
        shouldBrake = check(id - 1)
        if (shouldBreak) break
    }
    
    if (!ids.includes(id + 1)) {
        shouldBrake = check(id + 1)
        if (shouldBreak) break
    }
}