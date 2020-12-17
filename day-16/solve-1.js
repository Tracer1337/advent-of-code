const fs = require("fs")
const path = require("path")

const { makeChunks } = require("../utils")

function inRange(number, range) {
    return number >= range[0] && number <= range[1]
}

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const chunks = makeChunks(input, "\n")

const numbers = chunks[2].split("\n").slice(1).map(line => {
    return line.split(",").map(e => parseInt(e))
}).flat()

const ranges = []

chunks[0].split("\n").forEach(field => {
    const [_, a, b, c, d] = field.match(/[^:]+:\s(\d+)-(\d+)\sor\s(\d+)-(\d+)/).map(e => parseInt(e))

    ranges.push([a, b], [c, d])
})

let result = 0

numbers.forEach(number => {
    if (!ranges.some(range => inRange(number, range))) {
        result += number
    }
})

console.log(result)