const fs = require("fs")
const path = require("path")

const { Multiply, Add, Constant } = require("./math.js")

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
const lines = input.split("\n")

function findCloseIndex(input, start) {
    const stack = []

    for (let i = start; i < input.length; i++) {
        const char = input[i]

        if (char === "(") {
            stack.push("(")
        } else if (char === ")") {
            stack.pop()

            if (stack.length === 0) {
                return i
            }
        }
    }
}

function parse(input) {
    let expression

    for (let i = 0; i < input.length; i++) {
        const char = input[i]

        if (/\d/.test(char)) {
            const newExpression = new Constant(parseInt(char))

            if (!expression) {
                expression = newExpression
            } else {
                expression.right = newExpression
            }

        } else if (char === "+") {
            expression = new Add(expression)

        } else if (char === "*") {
            expression = new Multiply(expression)

        } else if (char === "(") {
            let closeIndex = findCloseIndex(input, i)

            const newExpression = parse(input.substring(i + 1, closeIndex))

            if (!expression) {
                expression = newExpression
            } else {
                expression.right = newExpression
            }

            i = closeIndex
        }
    }

    return expression
}

const sum = lines.reduce((sum, line) => sum += parse(line).eval(), 0)

console.log(sum)