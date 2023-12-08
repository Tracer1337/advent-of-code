const fs = require("fs")
const path = require("path")
const { makeChunks } = require("../utils")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const chunks = makeChunks(input)

const result = chunks.reduce((sum, chunk) => sum += new Set(chunk.match(/\w/g)).size, 0)

console.log(result)