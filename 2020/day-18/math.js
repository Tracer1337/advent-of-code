class Expression {
    toString() { }
    eval() { }
}

class Operator extends Expression {
    constructor(left, right) {
        super()
        this.left = left
        this.right = right
    }
}

class Multiply extends Operator {
    toString() {
        return `(${this.left} * ${this.right})`
    }

    eval() {
        return this.left.eval() * this.right.eval()
    }
}

class Add extends Operator {
    toString() {
        return `(${this.left} + ${this.right})`
    }

    eval() {
        return this.left.eval() + this.right.eval()
    }
}

class Constant extends Expression {
    constructor(value) {
        super()
        this.value = value
    }

    toString() {
        return this.value.toString()
    }

    eval() {
        return this.value
    }
}

module.exports = { Multiply, Add, Constant }