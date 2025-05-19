# AWS Lambda Bedrock Handler

A serverless application that processes HTTP requests with AWS Lambda.

## Project Overview

This project contains an AWS Lambda function that processes POST requests and returns enhanced responses with some fun facts and input analysis.

## Project Structure

```
aws-lambda-dynamodb/
├── events/             # Test event files
│   └── event.json      # Sample test event
├── src/                # Lambda function source code
│   ├── index.js        # Main Lambda handler
│   └── package.json    # Project dependencies
├── template.yml        # SAM template for deployment
└── README.md           # Project documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [AWS CLI](https://aws.amazon.com/cli/) (configured with appropriate credentials)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   cd src
   npm install
   ```

## Manually Adding Bedrock Permissions

If you need to manually add Bedrock permissions to an existing Lambda role, you can use the following AWS CLI command:

```bash
# Update the IAM role with Bedrock permissions
aws iam put-role-policy \
    --role-name bedrock-handler-role-du8j2b2h \
    --policy-name bedrock-access \
    --policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "bedrock:InvokeModel",
                "Resource": "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0"
            },
            {
                "Effect": "Allow",
                "Action": "bedrock:ListFoundationModels",
                "Resource": "*"
            }
        ]
    }'
```

## Local Development

### Invoke the function locally

```bash
cd src
npm run invoke
```

### Start a local API

```bash
cd src
npm run start
```

## Deployment

### Option 1: Deploy using SAM (creates or updates CloudFormation stack)

This method is useful if you want to manage the entire AWS infrastructure through CloudFormation:

```bash
cd src
npm run deploy
```

For subsequent deployments after configuration:

```bash
cd src
npm run deploy:quick
```

### Option 2: Direct deployment to existing Lambda function

This method updates just the function code of an existing Lambda function:

```bash
cd src
npm run deploy:direct
```

## Available Scripts

- `npm run start` - Start the API locally
- `npm run invoke` - Invoke the function locally with a test event
- `npm run build` - Build the SAM application
- `npm run deploy` - Deploy with guided setup
- `npm run deploy:quick` - Deploy without prompts
- `npm run deploy:direct` - Deploy directly to the existing Lambda function
- `npm run validate` - Validate the SAM template
- `npm run lint` - Run linting checks

## Testing the Function

After deploying, you can test the function by sending a POST request to your Lambda function URL with a JSON body:

```json
{
  "foo": "bar"
}
```

The function will return a response with:

- A fun AWS fact
- Analysis of your input
- Request metadata
- Your original data

**Tip:** To find available Bedrock models (such as Claude 3.5 Sonnet v2), use the following AWS CLI command:

```bash
aws bedrock list-foundation-models \
  --query "modelSummaries[?contains(modelId, 'claude-3-5-sonnet') && contains(modelId, 'v2')]"
```

This command filters the list of foundation models to show only those matching the specified criteria.
