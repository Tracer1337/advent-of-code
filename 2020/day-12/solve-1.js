const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const instructions = input.split("\n").map(line => [line[0], parseFloat(line.slice(1))])

let angle = 0

const radiants = deg => deg / 180 * Math.PI

const pos = instructions.reduce((pos, [command, value]) => {
    const add = (x, y) => [pos[0] + x, pos[1] + y]

    if (command === "N") return add(0, value)
    if (command === "S") return add(0, -value)
    if (command === "E") return add(value, 0)
    if (command === "W") return add(-value, 0)
    if (command === "F") return add(Math.cos(radiants(angle)) * value, -Math.sin(radiants(angle)) * value)
    if (command === "R") return (angle += value) !== undefined && pos
    if (command === "L") return (angle -= value) !== undefined && pos
    
    return pos
}, [0, 0])

console.log(Math.abs(pos[0]) + Math.abs(pos[1]))