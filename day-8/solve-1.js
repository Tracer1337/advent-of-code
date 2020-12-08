const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n").map(e => e.replace("\r", ""))

let visited = [], acc = 0

function call(index) {
    let [instruction, arg] = lines[index].split(" ")
    arg = parseInt(arg)

    if (!visited[index]) {
        visited[index] = true
    } else {
        console.log(acc)
        return
    }

    if (instruction === "nop") {
        call(index + 1)
    } else if (instruction === "jmp") {
        call(index + arg)
    } else if (instruction === "acc") {
        acc += arg
        call(index + 1)
    }
}

call(0)