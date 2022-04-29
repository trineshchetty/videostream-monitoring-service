
const express = require("express")
const cors = require("cors")
const compression = require("compression")

const app = express()

app.use(cors({
    "origin": "192.168.0.122"
}))
app.use(compression())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => res.sendStatus(200))
app.use("/api/v1", require("./routes/index"))

module.exports = app