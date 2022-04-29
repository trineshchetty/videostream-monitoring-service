const aws = require("aws-sdk")
require("dotenv").config()

var profile;

if (process.env.NODE_ENV == "dev")
{
    profile = process.env.dev_aws_profile

    var credentials = new aws.SharedIniFileCredentials({profile: profile});

    aws.config.credentials = credentials;

    aws.config.update({region: "af-south-1"})
}

if (process.env.NODE_ENV == "prod")
{
    profile = process.env.prod_aws_profile
}





module.exports = aws