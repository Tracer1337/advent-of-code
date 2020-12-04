class Password {
    static fromLine(line) {
        const [_, min, max, char, password] = line.match(/(\d+)-(\d+)\s(\w{1}):\s(\w+)/)
        return new Password({
            min: parseInt(min),
            max: parseInt(max),
            char,
            password
        })
    }
    
    constructor({ min, max, char, password }) {
        this.min = min
        this.max = max
        this.char = char
        this.password = password
    }
}

module.exports = Password