# AWS Lambda function for fetching student

Locally run:

` sam local invoke --env-vars env.json -e events/event.json`

where env.json contains values for Environment variables so process.env can read from.