

module.exports = function (service)
{
    async function getStreamsForUser (req, res, next)
    {
        try
        {
            res.send("getstreams")
        }
        catch(error)
        {
        }
    }

    async function createNewStream (req, res, next)
    {
    }

    return {
        getStreamsForUser: Object.freeze(getStreamsForUser),
        createNewStream: Object.freeze(createNewStream),
    }
}