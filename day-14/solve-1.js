const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n")

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function applyMask(value) {
    let binary = value.toString(2).padStart(36, 0)

    binary.split("").forEach((_, index) => {
        if (mask[index] !== "X") {
            binary = binary.replaceAt(index, mask[index])
        }
    })

    return parseInt(binary, 2)
}

let mask, memory = []

for (let line of lines) {
    if (line.startsWith("mask")) {
        mask = line.match(/mask = (.*)/)[1]
        continue
    }

    if (line.startsWith("mem")) {
        const [_, address, value] = line.match(/mem\[([0-9]+)\] = ([0-9]+)/).map(e => parseInt(e))
        memory[address] = applyMask(value)
    }
}

console.log(memory.reduce((sum, c) => sum += c, 0))