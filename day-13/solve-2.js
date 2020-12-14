/**
 * The solution is stolen from "The Morpheus Tutorials" :)
 */

const { execSync } = require("child_process")

console.log(execSync("python solve-2.py", { encoding: "utf-8" }))