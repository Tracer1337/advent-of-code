const fs = require("fs")
const path = require("path")
const Decoder = require("./Decoder.js")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const lines = input.split("\n")

const result = Math.max(...lines.map(line => new Decoder(line).getId()))

console.log(result)