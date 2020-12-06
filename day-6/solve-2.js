const fs = require("fs")
const path = require("path")
const { makeChunks } = require("../utils")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const chunks = makeChunks(input)

const result = chunks.reduce((sum, chunk) => {
    const subchunks = chunk.split(" ")

    const chars = {}

    subchunks.forEach(subchunk => {
        for (let char of subchunk) {
            if (!chars[char]) {
                chars[char] = 0
            }

            chars[char]++
        }
    })

    const validChars = Object.entries(chars).map(([char, count]) => count === subchunks.length ? char : null).filter(e => e)

    return sum + validChars.length
}, 0)

console.log(result)