require("dotenv").config()

const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)


describe ("main tests for video monitoring service", () => {

    beforeEach(() => {

    })

    it ("Should return ok", async () => {
        const response = await request.get("/")

        expect(response.statusCode).toBe(200)
        expect(response.text).toBe("OK")
    })

    it ("Should not be able to add a another video stream", async () => {

        await request.post("/api/v1/stream")
            .set("x-forwarded-for", "192.168.0.110")
            .send({
                video_name: "favourite-ad"
            })
            .then((res) => {
                expect(res.statusCode).toBe(406)
                expect(res.error.message).toBe("cannot POST /api/v1/stream (406)")
            })
            .catch(err => {
               expect(err).toBe(undefined)
            })
    })

    it ("Should create a new dynamodb record for a new stream", async () => {

        await request.post("/api/v1/stream")
            .set("x-forwarded-for", "192.168.0.110")
            .send({
                video_name: "falcoln-9-launch"
            })
            .then((res) => {
                expect(res.statusCode).toBe(406)
                expect(res.error.message).toBe("cannot POST /api/v1/stream (406)")
            })
            .catch(err => {
               expect(err).toBe(undefined)
            })
    })

    it ("Should be able to retrive all streams for a given target origin", async () => {

        await request.get("/api/v1/streams")
            .set("x-forwarded-for", "192.168.0.110")
            .then((res) => {
                expect(res.body).toHaveProperty("statusCode")
                expect(res.body).toHaveProperty("count")
                expect(res.body).toHaveProperty("result")
            })
            .catch(err => {
               expect(err).toBe(undefined)
            })
    })
})