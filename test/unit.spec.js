require("dotenv").config()

const videoStreamMonitorService = require("../src/services/stream.monitor.service")()


describe ("main tests for video monitoring service", () => {
    it ("Should return ok", () => {
        const filterTestFn = jest.fn();
        filterTestFn.mockReturnValueOnce("OK").mockReturnValueOnce(false);
    })

    it("Shoud expect createNewStreamForUser function to be defined", async () => {

        const streamData = {
            "ip_addr": "192.168.0.110"
        }
        expect(videoStreamMonitorService.createNewStreamForUser).toBeDefined(); 
    })

    it("Shoud expect getStreamsForUserByIp function to be defined", async () => {

        expect(videoStreamMonitorService.getStreamsForUserByIp).toBeDefined();
    })
})  