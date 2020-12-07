class Node {
    static fromLine(line) {
        let stack = []

        const words = line.replace(/[,.]/g, "").split(" ")

        for (let word of words) {
            const top = stack.pop()

            if (/(bag|bags|contain|no|other)/.test(word)) {
                stack.push(top)
                continue
            }

            if (/\d+/.test(word)) {
                stack.push(top, parseInt(word))
                continue
            }

            if (/\w+/.test(word)) {
                if (typeof top === "string") {
                    stack.push(top + word + " ")
                } else {
                    stack.push(top, word + " ")
                }
                continue
            }
        }

        stack = stack
            .filter(e => typeof e !== "undefined")
            .map(e => typeof e === "string" ? e.trim() : e)

        const color = stack.shift()

        const entries = []
        for (let i = 0; i < stack.length; i += 2) {
            entries.push([stack[i + 1], stack[i]])
        }

        const children = Object.fromEntries(entries)

        return new Node(color, children)
    }

    constructor(color, children) {
        this.color = color
        this.children = children
    }

    contains(color, nodes) {
        if (color in this.children) {
            return true
        }

        if (Object.keys(this.children).some(child => nodes[child].contains(color, nodes))) {
            return true
        }

        return false
    }

    getAmountOfChildren(nodes) {
        let amount = 0

        for (let key in this.children) {
            if (key in nodes) {
                amount += this.children[key] * (nodes[key].getAmountOfChildren(nodes) + 1)
            } else {
                amount += this.children[key]
            }
        }

        return amount
    }
}

module.exports = Node