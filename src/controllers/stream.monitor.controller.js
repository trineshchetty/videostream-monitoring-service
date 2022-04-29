const { videoStreamSchemaDto, reqStreamsDto } = require("../schemas/video-stream-schema")
const _ = require("lodash")

module.exports = function (service)
{
    async function getStreamsForUser (req, res, next)
    {
        try
        {
            if (req.headers["x-forwarded-for"])
            {
                await reqStreamsDto.validateAsync({
                    ip_addr: req.headers["x-forwarded-for"]
                })
                let response = await service.getStreamsForUserByIp(req.headers["x-forwarded-for"])

                res.json({
                    statusCode: 200,
                    count: response.Items.length,
                    result: response.Items
                })
            }
            else
            {
                throw new Error(JSON.stringify({
                    statusCode: 406,
                    message: "x-forwarded-for header not present",
                    status: "Not Acceptable"
                }))
            }
        }
        catch(error)
        {
            res.json({
                error: error.toString(),
                statusCode: 503
            })
        }
    }

    async function createNewStream (req, res, next)
    {
        try
        {
            if (req.headers["x-forwarded-for"])
            {
                const isValid = await videoStreamSchemaDto.validateAsync({
                    ip_addr: req.headers["x-forwarded-for"],
                    ...req.body
                })

                if (isValid)
                {
                    const response = await service.createNewStreamForUser(isValid)

                    res.json({
                        statusCode: 201,
                        result: response,
                        message: "Added new stream record for this target"
                    })
                }
            }
            else
            {
                throw new Error(JSON.stringify({
                    statusCode: 406,
                    message: "x-forwarded-for header not present",
                    status: "Not Acceptable"
                }))
            }
        }
        catch(error)
        {

            if (_.includes(error.toString(), "406"))
            {
                const formatErrorResponse = error.toString().replace("Error: ", "")
                res.sendStatus(406)
            }
            else
            {
                res.json({
                    error: error.toString(),
                    statusCode: 503
                })
            }
        }
    }

    return {
        getStreamsForUser: Object.freeze(getStreamsForUser),
        createNewStream: Object.freeze(createNewStream),
    }
}