class Decoder {
    constructor(text) {
        this.text = text
    }

    getRow() {
        return this.binarySearch(0, 127, this.text.substr(0, 7), "B", "F")
    }

    getColumn() {
        return this.binarySearch(0, 7, this.text.substr(7, 10), "R", "L")
    }

    getId() {
        return this.getRow() * 8 + this.getColumn()
    }

    binarySearch(min, max, str, upper, lower) {
        for (let char of str) {
            const delta = Math.ceil((max - min) / 2)

            if (char === upper) {
                // Upper half
                min += delta
            } else if (char === lower) {
                // Lower half
                max -= delta
            } else {
                throw new Error(`Unsupported character: ${char}`)
            }
        }

        if (min !== max) {
            throw new Error("Upsi")
        }

        return min
    }
}

module.exports = Decoder