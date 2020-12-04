const fs = require("fs")
const path = require("path")
const Password = require("./Password.js")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const passwords = input.split("\n").map(e => {
    return Password.fromLine(e)
})

const valid = passwords.filter(pwd => {
    const first = pwd.password.charAt(pwd.min - 1)
    const last = pwd.password.charAt(pwd.max - 1)

    const matchFirst = first === pwd.char
    const matchLast = last === pwd.char

    const result = (matchFirst || matchLast) && !(matchFirst && matchLast)

    return result
})

console.log(valid.length)