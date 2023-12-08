const fs = require("fs")
const path = require("path")
const Node = require("./Node.js")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n")

const nodes = {}

lines.forEach(line => {
    const node = Node.fromLine(line)
    nodes[node.color] = node
})

const result = Object.values(nodes).filter(node => node.contains("shiny gold", nodes))

console.log(result.length)