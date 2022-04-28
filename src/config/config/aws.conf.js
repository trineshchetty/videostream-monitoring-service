const aws = require("aws-sdk")

var profile;

if (process.env.NODE_ENV == "prod")
{
    profile = "hooligan-dev"
}

if (process.env.NODE_ENV == "prod")
{
    profile = "hooligan-prod"
}


var credentials = new aws.SharedIniFileCredentials({profile: profile});

aws.config.credentials = credentials;

aws.config.update({region: "af-south-1"})


module.exports = aws