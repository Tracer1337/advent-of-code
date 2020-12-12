const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const instructions = input.split("\n").map(line => [line[0], parseFloat(line.slice(1))])

const rad = deg => deg / 180 * Math.PI

let pivot = [10, 1]

const pos = instructions.reduce((pos, [command, value]) => {
    const add = (x, y) => pivot = [pivot[0] + x, pivot[1] + y]
    const rotate = (deg) => pivot = [Math.cos(rad(deg)) * pivot[0] - Math.sin(rad(-deg)) * pivot[1], Math.sin(rad(-deg)) * pivot[0] + Math.cos(rad(deg)) * pivot[1]]
    const move = (n) => pos = [pos[0] + n * pivot[0], pos[1] + n * pivot[1]]

    if (command === "N") add(0, value)
    if (command === "S") add(0, -value)
    if (command === "E") add(value, 0)
    if (command === "W") add(-value, 0)
    if (command === "F") move(value)
    if (command === "R") rotate(value)
    if (command === "L") rotate(-value)

    return pos
}, [0, 0])

console.log(Math.abs(pos[0]) + Math.abs(pos[1]))