const aws = require("aws-sdk")
require("dotenv").config()

var profile;


if ((process.env.JEST_WORKER_ID || process.env.TS_JEST) && process.env.NODE_ENV == "test")
{

}

if (process.env.NODE_ENV == "dev")
{
    profile = process.env.dev_aws_profile

    var credentials = new aws.SharedIniFileCredentials({profile: profile});

    aws.config.credentials = credentials;
}

if (process.env.NODE_ENV == "prod")
{
    profile = process.env.prod_aws_profile
}


aws.config.update({region: "af-south-1"})





module.exports = aws