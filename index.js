const app = require("./server")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "localhost" 

app.listen(PORT, HOST, () => {

    console.log(`Application Listening on PORT ${PORT} on host/ipv4 ${HOST}`)
})