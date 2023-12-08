const fs = require("fs")
const path = require("path")

const { Multiply, Add, Constant } = require("./math.js")

// const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8")
// const lines = input.split("\n")

// Source: https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function findCloseBracket(input, start) {
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
            let closeIndex = findCloseBracket(input, i)

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

function setBrackets(input) {
    function findOpenIndex(operatorIndex) {
        const stack = []

        for (let i = operatorIndex; i >= 0; i--) {
            const char = input[i]

            if (char === ")") {
                stack.push(")")
            } else if (char === "(") {
                stack.pop()

                if (stack.length === 0) {
                    return i
                }
            }
        }
    }

    function findCloseIndex(operatorIndex) {
        const stack = []

        for (let i = operatorIndex; i < input.length; i++) {
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

    for (let i = 0; i < input.length; i++) {
        const char = input[i]

        if (char === "+") {
            console.log(input, findOpenIndex(i), findCloseIndex(i))
            input = input.splice(findOpenIndex(i), 0, "(")
            input = input.splice(findCloseIndex(i), 0, ")")

            i++
        }
    }

    return input
}

console.log(setBrackets("1 + 2 + 3"))
console.log(setBrackets("1 * 2 + 3"))
console.log(setBrackets("1 * 2 + (3 * 4)"))
console.log(setBrackets("(1 * 2) + 3 * 4"))
console.log(setBrackets("(1 * 2) + (3 * 4)"))

// const input = setBrackets("2 * 3 + (4 * 5)")
// const expression = parse(input)

// console.log(input)
// console.log(expression)
// console.log(expression.toString())
// console.log(expression.eval())

// const sum = lines.reduce((sum, line) => sum += parse(line).eval(), 0)

// console.log(sum)