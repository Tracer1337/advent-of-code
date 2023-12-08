const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n").map(e => e.replace("\r", ""))

let visited = [], acc = 0, fix = 0

function test(index) {
    if (!lines[index]) {
        return true
    }

    let [instruction, arg] = lines[index].split(" ")
    arg = parseInt(arg)

    if (index === fix) {
        instruction = instruction === "nop" ? "jpm" : instruction === "jmp" ? "nop" : instruction
    }

    if (!visited[index]) {
        visited[index] = true
    } else {
        return false
    }

    if (instruction === "nop") {
        return test(index + 1)
    } else if (instruction === "jmp") {
        return test(index + arg)
    } else if (instruction === "acc") {
        acc += arg
        return test(index + 1)
    }
}

while(!test(0) && fix < lines.length) {
    acc = 0
    visited = []
    fix++
}

console.log(acc)