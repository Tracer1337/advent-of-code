const path = require("path")
const fs = require("fs")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")

const numbers = input.split("\n").map(e => parseInt(e))

;(function() {
    for (let n of numbers) {
        for (let m of numbers) {
            for (let x of numbers) {
                if (n + m + x == 2020) {
                    console.log(n * m * x)
                    return
                }
            }
        }
    }
})()