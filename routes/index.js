const Router = require("express").Router
const router = Router()

const { streamMonitorController } = require("../src/main")


router.get("/streams", streamMonitorController.getStreamsForUser)
router.post("/stream", streamMonitorController.createNewStream)

module.exports = router