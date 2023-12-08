const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n")

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function applyMask(input, mask) {
    input.split("").forEach((_, index) => {
        if (mask[index] === "0") {
            return
        }

        input = input.replaceAt(index, mask[index])
    })

    return input
}

function resolveFloats(input) {
    const results = []

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "X") {
            input[i] = 0
            results.push(...resolveFloats([...input]))

            input[i] = 1
            results.push(...resolveFloats([...input]))

            return results
        }
    }

    return [input]
}

function getAddresses(value) {
    let binary = value.toString(2).padStart(36, 0)

    const masked = applyMask(binary, mask)
    
    const results = resolveFloats(masked.split("")).map(e => e.join(""))

    return results
}

let mask, memory = {}

for (let line of lines) {
    if (line.startsWith("mask")) {
        mask = line.match(/mask = (.*)/)[1]
        continue
    }

    if (line.startsWith("mem")) {
        const [_, address, value] = line.match(/mem\[([0-9]+)\] = ([0-9]+)/).map(e => parseInt(e))
        getAddresses(address).forEach(address => memory[parseInt(address, 2)] = value)
    }
}

console.log(Object.values(memory).reduce((sum, c) => sum += c, 0))

