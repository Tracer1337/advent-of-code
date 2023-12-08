const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const numbers = input.split(",").map(e => parseInt(e))

for (let i = numbers.length; i < 2020; i++) {
    let number = numbers[i - 1]
    let newNumber = 0

    for (let j = i - 2; j >= 0; j--) {
        if (numbers[j] === number) {
            newNumber = (i - 1) - j
            break
        }
    }

    numbers[i] = newNumber
}

console.log(numbers[2020 - 1])