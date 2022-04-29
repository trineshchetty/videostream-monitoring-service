
# AWS Backend Coding Challenge

Build a service in Node.js that exposes an API which can be consumed from any client. This service must check how many video streams a given user is watching and prevent a user from watching more than 3 video streams concurrently. Using services like API Gateway, ECS, ALB etc will be a huge bonus. 

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

- Implement a solution whereby, depending on the environment you are in, create a new table with a staging prefix.

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

The current architecture makes use of ECS with Fargate sitting behind an Application Load Balancer. The ALB does its health checks to ensure the ecs cluster, service, and tasks are in good shape. We make use of an autoscaling step policy that keeps track of cpu utilization. When the cpo utilization is greater or equal to 85% an alarm will trigger in CloudWatch, this will increase the capacity. As the CPU drops below 10% another CloudWatch Alarm will be triggered, this will scale down the capacity.	

Another scaling strategy we could have used in target tracking. Where we could have the policy keep track of the average CPU utilization and always ensure that this metric remains relatively the same, also making sure the auto scaling group remains  running in a capacity that is defined by the scaling metric and metric value.


Important Aspects of scaling:
Monitoring the health of your instances, services and tasks is crucial to understanding how your application is responding. Depending on your use case, you could integrate cloudwatch with many external services like slack, email, sms and even whatsapp, through services like sns and aws pinpoint. Another cool feature of AWS is predictive auto scaling which could become useful in predicting how to respond to the environment, by analyzing historical data and scaling to meet demand.



## API Reference

#### Get all items

```http
  GET /api/v1/streams
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-forwarded-for` | `string` | **Required**. The IPv4 Addres |

#### Get item

```http
  POST /api/v1/stream
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-forwarded-for`      | `string` | **Required**. The IPv4 Addres |

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