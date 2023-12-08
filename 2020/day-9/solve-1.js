const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const numbers = input.split("\n").map(e => parseInt(e))

const pre = 25

for (let i = pre - 1; i < numbers.length; i++) {
    if (!isValid(i)) {
        console.log(numbers[i])
        process.exit()
    }
}

function isValid(index) {
    for (let i = 1; i <= pre; i++) {
        for (let j = 1; j <= pre; j++) {
            if (i === j) {
                continue
            }

            if (numbers[index - i] + numbers[index - j] === numbers[index]) {
                return true
            }
        }
    }
    
    return false
}