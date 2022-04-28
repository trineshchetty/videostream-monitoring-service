const express = require("express")
const cors = require("cors")
const compression = require("compression")



const app = express()


app.use(cors())
app.use(compression())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => res.send("OK").status(200))

const PORT = 3000
app.listen(PORT, () => {

    console.log(`Application Listening on PORT ${PORT}`)
})