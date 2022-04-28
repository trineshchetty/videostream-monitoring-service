
# outputs.tf

# output "alb_hostname" {
#   value = aws_alb.main.dns_name
# }

output "ecr-image-url" {
  value=aws_ecr_repository.testv1.repository_url
}