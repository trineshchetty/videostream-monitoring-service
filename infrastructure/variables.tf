# variables.tf


variable "shared_credentials_path" {
  description = "Path of aws config and credentials $HOME/.aws/credentials || ~/.aws/credentials"
  default     = "~/.aws/credentials"
}

variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "af-south-1"
}
variable "aws_profile" {
  description = "The AWS profile name"
  default     = "dash"
}

variable "repo_name" {
  description = "The name of the ecr repository"
  default     = "video-stream-monitoring"
}


variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "myEcsTaskExecutionRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "3"
}

variable "app_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "843746227026.dkr.ecr.af-south-1.amazonaws.com/video-stream-monitoring:latest"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = "3000"
}

variable "host_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = "80"
}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 3
}

variable "health_check_path" {
  default = "/"
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "1024"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "2048"
}