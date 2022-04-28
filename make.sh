#!/bin/bash


# AWS variables
AWS_PROFILE=dash
AWS_REGION=af-south-1
# project name
PROJECT_NAME=video-stream-monitoring
# Docker image name
DOCKER_IMAGE=video-stream-monitoring
# terraform
export TF_VAR_project_name=$PROJECT_NAME
export TF_VAR_region=$AWS_REGION
export TF_VAR_profile=$AWS_PROFILE

# the directory containing the script file
dir="$(cd "$(dirname "$0")"; pwd)"
cd "$dir"


log()   { echo -e "\e[30;47m ${1^^} \e[0m ${@:2}"; }        # $1 uppercase background white
info()  { echo -e "\e[48;5;28m ${1^^} \e[0m ${@:2}"; }      # $1 uppercase background green
warn()  { echo -e "\e[48;5;202m ${1^^} \e[0m ${@:2}" >&2; } # $1 uppercase background orange
error() { echo -e "\e[48;5;196m ${1^^} \e[0m ${@:2}" >&2; } # $1 uppercase background red

ecr-create() {
    local repo=$(aws ecr describe-repositories \
        --repository-names $PROJECT_NAME \
        --region $AWS_REGION \
        --profile $AWS_PROFILE \
        2>/dev/null)
    [[ -n "$repo" ]] && { warn warn repository already exists; return; }

    REPOSITORY_URI=$(aws ecr create-repository \
        --repository-name $PROJECT_NAME \
        --query 'repository.repositoryUri' \
        --region $AWS_REGION \
        --profile $AWS_PROFILE \
        --output text \
        2>/dev/null)
    log REPOSITORY_URI $REPOSITORY_URI
}

# if `$1` is a function, execute it. Otherwise, print usage
# compgen -A 'function' list all declared functions
# https://stackoverflow.com/a/2627461
FUNC=$(compgen -A 'function' | grep $1)
[[ -n $FUNC ]] && { info execute $1; eval $1; } || usage;
