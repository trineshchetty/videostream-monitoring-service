const aws = require("../config/aws.conf")
const { videoStreamSchema } = require("../schemas/video-stream-schema")

const moment = require("moment")
const uuid = require("uuid")
const dynamodb = new aws.DynamoDB.DocumentClient({})


module.exports = function streamMonitorService ()
{

    async function createNewStreamForUser (streamData)
    {
        try
        {
    
            if (process.env.DYNAMO_TABLE_NAME && process.env.DYNAMO_TABLE_NAME !== '')
            {

       
                
                const streamsForOriginTarget = await getStreamsForUserByIp(streamData.ip_addr)

                if (streamsForOriginTarget.Count <= 2)
                {
                    const videoStreamItem = {
                        video_ended: false,
                        video_playing:true,
                        video_start_time: moment(moment.now()).format("YYYY-MM-DDTHH:mm:ss").toString(),
                        video_end_time: streamData.video_end_time ? moment(moment.now()).format("YYYY-MM-DDTHH:mm:ss").toString() : null,
                        ip_addr: streamData.ip_addr,
                        ...streamData
                    }
                    

                    await videoStreamSchema.validateAsync(videoStreamItem)

                    const params =
                    {
                        TableName: "user-streams",
                        Item:
                        {
                            PK: streamData.ip_addr,
                            SK: `STREAM_ID#${uuid.v4()}`,
                            created_at: moment(moment.now()).format("YYYY-MM-DDTHH:mm:ss").toString(),
                            updated_at: null,
                            deleted_at: null,
                            is_deleted: false,
                            ...videoStreamItem
                        },
                        ConditionExpression: "attribute_not_exists(SK)",
                    }

                    await dynamodb.put(params).promise()

                    return videoStreamItem
                }
                else
                {
                    throw new Error(JSON.stringify({
                        statusCode: 406,
                        message: "Cannot stream more than 3 videos at a time"
                    }))
                }
            }
            else
            {
                throw new Error(JSON.stringify({
                    statusCode: 503,
                    mesage: "Bad Request"
                }))
            }
        }
        catch(error)
        {
            throw new Error(error)
        }
    }


    async function getStreamsForUserByIp (ip)
    {
        try
        {
            if (process.env.DYNAMO_TABLE_NAME && process.env.DYNAMO_TABLE_NAME !== '')
            {
                const params =
                {
                    TableName: process.env.DYNAMO_TABLE_NAME,
                    KeyConditionExpression: "PK = :PK AND begins_with(SK, :SK)",
                    FilterExpression: "is_deleted = :is_deleted",
                    ExpressionAttributeValues: {
                        ":PK": ip,
                        ":SK": "STREAM_ID",
                        ":is_deleted": false
                    }
                }
    
                return await dynamodb.query(params).promise()
            }
        }
        catch(error)
        {
            throw new Error(error)
        }
    }


    return {
        createNewStreamForUser: Object.freeze(createNewStreamForUser),
        getStreamsForUserByIp: Object.freeze(getStreamsForUserByIp)
    }
}