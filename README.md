
# AWS Backend Coding Challenge

Build a service in Node.js that exposes an API which can be consumed from any client. This service must check how many video streams a given user is watching and prevent a user from watching more than 3 video streams concurrently.

# AWS Services using Terraform:
- VPC
- ECS with fargate
- Application Load Balancer
- IAM Roles for ECS
- Target Groups
- Cloudwatch log group for ECS
- Autoscaling Policy for ECS and fargate with Cloudwatch Alarms
- Security Groups

# Setting up the local environment:

For local development you need to have the following installed:

- Nodejs v17.xx
- AWS CLI
- AWS Account with IAM user credentials stored for console and programmatic access
- Docker
- Terraform
- Git
- Jest global and local install


### nodemon
npm install -g nodemon

### Environment File (.env)

- PORT
- dev_aws_profile
- prod_aws_profile
- DYNAMO_TABLE_NAME
- HOST

# Next Steps

- Clone repository
- Setup the aws config/credentials folder found in:
    - $HOME/.aws/credentials (mac)
    - ~/.aws/credentials (linux/ubuntu)

- Or Use AWS CLI:
    - aws configure
    - aws configure set region us-west-1 --profile integ


## Note
Once AWS is configured you can run the commands found in commands.txt. This will create the ecr repository as well as dynamodb table. Ensure that you specify the aws-profile as the second command line argument.


# Setup Github:

Create a fork or new repository in github.

- Add AWS Credentials to github secrets found in repo settings
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY

- Testing
    - Testing Locally: depends on jest installation
    - To test locally:
        - npm run test

## Note
Do note that the e2e.spec.js script is a supertest and thus will create new records in dynamodb. The testing pipeline hasn’t been optimized for efficiency and reliability. To improve the testing pipeline there are a few options to use:

- Localstack (https://localstack.cloud/)
    - Localstack provides an easy-to-use test/mocking framework for developing Cloud applications.

- DynamoDb Local (https://www.serverless.com/plugins/serverless-dynamodb-local)
    - Serverless Dynamodb Local Plugin - Allows to run dynamodb locally for serverless

- Implement a solution whereby, depending on the environment you are in, create a new table with a environment prefix.

- Create a new aws account with AWS Organizations, thus separating your development, testing and production accounts. (reliable)



# Provisioning AWS Resources:

CD into the root project directory: Depends on Terraform being successfully installed.

- Initialized Terraform:
    . make.sh tf-init

- Validate Terraform
    . make.sh tf-validate

- Plan and Apply Terraform:
    . make.sh tf-apply



Once the provisioning is successful. You will have all the necessary services to run this service in the public cloud in a secure, scalable way.


## Github Workflow:

Everytime we push a change, github actions will build and push a new image version to ecr, this will slowly update the ecs tasks, and services.



## Scalabiliity Strategy:


The current architecture makes use of ECS with Fargate sitting behind an Application Load Balancer, with auto scaling policy and deployed to 3 availability zones. The ALB does its health checks to ensure the ecs cluster, service, and tasks are in good shape. We make use of an autoscaling step policy that keeps track of cpu utilization. When the CPU utilization is greater or equal to 85% an alarm will trigger in CloudWatch, this will increase the capacity by 1. As the CPU drops below 10% another CloudWatch Alarm will be triggered, this will scale down the capacity by 1.	

Another scaling strategy we could have used in target tracking. Where we could have the policy keep track of the average CPU utilization and always ensure that this metric remains relatively the same, based on the metric you set.

We could also use capacity provider strategies. Specifically between Fargate and Fargate Spot. Fargate spot would allow us to save on costs, as spot instances are not ideal for resiliency, we could combine it with fargate.

E.g. 
- Fargate: base=3. Weight: 1
- Fargate Spot: base=0, weight=2

This ensures 3 tasks are deployed as a minimum to fargate, and thereafter, everytime we get a  new task in fargate, 2 tasks are provisioned to fargate spot.

This will help us maintain high availability and performance.

A scheduled scaling policy could be used if we know the demand based on usage patterns. An example would be an ecommerce website serving customers on Black Friday, or the festive season.



## Improvements:

- Better Testing
    - Create a localstack instance /connection to do end-to-end database and service tests.
    - Create more mock functions to test the function units
    - Create a testing environment with AWS Organizations

- Automate / implement manual creation of ecr and dynamodb with the ci/cd pipeline.
- Integrate current CI/CD with Code Pipeline, Build and Deploy




## API Reference

#### Get all streams for ip target

```http
  GET /api/v1/streams
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-forwarded-for` | `string` | **Required**. The IPv4 Address |

#### Add a new video stream record

```http
  POST /api/v1/stream
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-forwarded-for`      | `string` | **Required**. The IPv4 Address |

#### Body (optional data)
- video_name
- codec_info
- file_type
- size
- src
- framerate
- video_ended
- video_playing
- video_start_time
- video_end_time
