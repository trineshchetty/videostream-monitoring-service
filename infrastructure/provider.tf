
# Specify the provider and access details
provider "aws" {
  shared_credentials_files = [var.shared_credentials_path]
  profile                 = var.aws_profile
  region                  = var.aws_region
}