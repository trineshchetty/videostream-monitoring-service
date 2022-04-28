# logs.tf

# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "myVideoStreamMonitoringLogGroup" {
  name              = "/ecs/myVideoStreamMonitoringApp"
  retention_in_days = 30

  tags = {
    Name = "cb-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "myapp_log_stream" {
  name           = "my-log-stream"
  log_group_name = aws_cloudwatch_log_group.myVideoStreamMonitoringLogGroup.name
}