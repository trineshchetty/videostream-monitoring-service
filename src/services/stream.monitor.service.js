const aws = require("aws-sdk")


const dynamodb = new aws.DynamoDB.DocumentClient()


module.exports = function streamMonitorService (logger)
{
    async function createNewStreamForUser (userData)
    {
    }

    async function getStreamsForUserByIp (ip)
    {
    }
}