# aws-lambda-dynamodb

This project demonstrates an AWS Lambda (Node.js) backed by DynamoDB and tested locally via AWS SAM.

## Prerequisites

- Node.js (>=14.x)
- AWS SAM CLI (https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Docker (for local invocation)

## Setup

1. Clone the repo

   ```bash
   git clone https://your-repo-url.git
   cd aws-lambda-dynamodb
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Build your application
   ```bash
   sam build
   ```

## Local Testing

To invoke your function locally with the provided sample event:

```bash
sam local invoke TestFunctionURL --event events/event.json
```

You should see your Lambda’s output in the console.

## Troubleshooting

- Ensure Docker is running and accessible.
- If you get a 405 error, verify that `events/event.json` has:
  ```json
  "requestContext": {
    "http": { "method": "POST" }
  }
  ```
