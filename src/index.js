import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

// Initialize the Bedrock client
const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

// Claude 3.5 Sonnet model ID
const MODEL_ID = 'anthropic.claude-3-5-sonnet-20241022-v2:0';

export const handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));

  // Get request method or default to UNKNOWN
  const method = event?.requestContext?.http?.method || 'UNKNOWN';

  // Only allow POST method
  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        Allow: 'POST',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: `Method ${method} Not Allowed` }),
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');

    // Extract the question from the body
    const question = body.question;

    if (!question) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Error processing your request',
          error: 'Missing "question" field in request body',
        }),
      };
    }

    console.log(`Processing question: "${question}"`);

    // Create the payload for Claude 3.5 Sonnet (correct format)
    const payload = {
      anthropic_version: 'bedrock-2023-05-31',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: question,
            },
          ],
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    };

    // Create and send the command
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    console.log('Sending request to Bedrock...');
    // Call Bedrock
    const response = await bedrockClient.send(command);

    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    // Extract the model's response text (updated for Claude 3.5 response format)
    const modelResponse = responseBody.content?.[0]?.text || (responseBody.content && responseBody.content.length > 0 && responseBody.content[0].type === 'text' ? responseBody.content[0].text : '');

    console.log('Response received from Bedrock');

    // Return the response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        answer: modelResponse,
        model: MODEL_ID,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Error:', error);

    // Determine if this is a Bedrock-specific error
    const errorMessage = error.message || 'Unknown error';
    const isBedrock = errorMessage.includes('Bedrock');

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Error processing your request',
        error: errorMessage,
        helpMessage: isBedrock
          ? 'Make sure you have enabled access to Claude 3.5 Sonnet v2 in the AWS Bedrock console and that your region is correct.'
          : 'An unexpected error occurred while processing your request.',
      }),
    };
  }
};
