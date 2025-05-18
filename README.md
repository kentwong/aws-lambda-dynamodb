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
