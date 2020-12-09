const fs = require("fs")
const path = require("path")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const numbers = input.split("\n").map(e => parseInt(e))

const query = 50047984

for (let i = 0; i < numbers.length; i++) {
    let sum = numbers[i]
    const summands = [numbers[i]]

    for (let j = i + 1; j < numbers.length; j++) {
        sum += numbers[j]
        summands.push(numbers[j])

        if (sum === query) {
            console.log(Math.min(...summands) + Math.max(...summands))
            process.exit()
        }

        if (sum > query) {
            break
        }
    }
}