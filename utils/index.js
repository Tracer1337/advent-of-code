/**
 * Split a string by empty lines.
 * 
 * Example:
 * 
 * iyr:2016 hgt:187cm byr:1980 pid:977322718
 * eyr:2027 ecl:brn hcl:#ceb3a1
 * 
 * iyr:2010 ecl:oth
 * pid:455361219 hgt:153cm eyr:2027 hcl:#6b5442
 * byr:1965
 * 
 * Becomes:
 * 
 * [
 *     "iyr:2016 hgt:187cm byr:1980 pid:977322718 eyr:2027 ecl:brn hcl:#ceb3a1",
 *     "iyr:2010 ecl:oth pid:455361219 hgt:153cm eyr:2027 hcl:#6b5442 byr:1965"
 * ]
 * 
 * @param {String} input
 * @param {String} [join=" "]
 * @returns {Array<String>} Chunks
 */
function makeChunks(input, join = " ") {
    input = input.replace(/\r/g, "")

    const lines = input.split("\n")
    
    const chunks = []

    let currentChunk = []
    for (let line of lines) {
        if (line === "") {
            chunks.push(currentChunk.join(join))
            currentChunk = []
        } else {
            currentChunk.push(line)
        }
    }

    if (currentChunk.length > 0) [
        chunks.push(currentChunk.join(join))
    ]

    return chunks
}

module.exports = { makeChunks }