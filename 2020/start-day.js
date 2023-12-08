const fs = require("fs-extra")
const path = require("path")
const fetch = require("node-fetch")
const open = require("open")
const { run, exec, makeRunnable } = require("@m.moelter/task-runner")
require("dotenv").config()

const day = process.argv[2]

if (!day) {
    throw new Error("Missing day")
}

const TEMPLATE_DIR = path.join(__dirname, "template")
const NEW_DIR = path.join(__dirname, "day-" + day)
const INPUT_PATH = path.join(NEW_DIR, "input.txt")

if (fs.existsSync(NEW_DIR)) {
    throw new Error("Directory already exists")
}

const BASE_URL = "https://adventofcode.com/2020"
const DAY_URL = BASE_URL + "/day/" + day
const INPUT_URL = DAY_URL + "/input"

makeRunnable(async () => {
    await run(async () => {
        return fs.copy(TEMPLATE_DIR, NEW_DIR)
    }, "Create files")

    await run(async () => {
        const res = await fetch(INPUT_URL, {
            headers: {
                cookie: "session=" + process.env.SESSION_TOKEN
            }
        })

        const text = await res.text()

        await fs.writeFile(INPUT_PATH, text)
    }, "Fetch input")

    await run(() => {
        return Promise.all([
            open(DAY_URL),
            exec("code " + __dirname)
        ])
    }, "Open Applications")
})()