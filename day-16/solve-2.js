const fs = require("fs")
const path = require("path")

const { makeChunks } = require("../utils")

function inRange(number, range) {
    return number >= range[0] && number <= range[1]
}

const input = fs.readFileSync(path.join(__dirname, "input-1.txt"), "utf-8")
const chunks = makeChunks(input, "\n")

const lines = chunks[2].split("\n").slice(1).map(line => {
    return line.split(",").map(e => parseInt(e))
})

lines.unshift(chunks[1].split("\n")[1].split(",").map(e => parseInt(e)))

const ranges = chunks[0].split("\n").map(field => {
    const [_, a, b, c, d] = field.match(/[^:]+:\s(\d+)-(\d+)\sor\s(\d+)-(\d+)/).map(e => parseInt(e))
    return [[a, b], [c, d]]
})

const valid = lines[0].map(() => ranges.map((_, i) => i))

lines.forEach(line => {
    line.forEach((number, i) => {
        valid[i].forEach((i, j, validFields) => {
            if (!inRange(number, ranges[i][0]) && !inRange(number, ranges[i][1])) {
                validFields.splice(j, 1)
            }
        })

        if (valid[i].length === 1) {
            valid.forEach((validFields, j) => {
                if (j === i) return

                const index = validFields.indexOf(valid[i][0])
                if (index !== -1) {
                    validFields.splice(index, 1)
                }
            })
        }
    })
})

console.log(valid)