const fs = require("fs")
const path = require("path")
const Password = require("./Password.js")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const passwords = input.split("\n").map(e => {
    return Password.fromLine(e)
})

const valid = passwords.filter(password => {
    const matches = (password.password.match(new RegExp(`${password.char}`, "g")) || []).length
    return matches >= password.min && matches <= password.max
})

console.log(valid.length)