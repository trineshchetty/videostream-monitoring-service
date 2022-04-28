resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "user-streams"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "PK"
  range_key      = "SK"


  attribute {
        name = "PK"
        type = "S"
    }


  attribute {
        name = "SK"
        type = "S"
    }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }

  tags = {
    Name        = "dynamodb-"
    Environment = "production"
  }
}