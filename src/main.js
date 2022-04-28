


const streamMonitorService = require("./services/stream.monitor.service")

const streamMonitorController = require("./controllers/stream.monitor.controller")(streamMonitorService)



module.exports = {
    streamMonitorController
}
