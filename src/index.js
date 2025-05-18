export const handler = async (event) => {
  // Get request method or default to UNKNOWN
  const method = event?.requestContext?.http?.method || 'UNKNOWN';

  // Only allow POST method
  if (method !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: JSON.stringify({ error: `Method ${method} Not Allowed` }),
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');

    // Generate random fun fact
    const funFacts = [
      'AWS Lambda was first announced in 2014',
      'DynamoDB can handle more than 20 million requests per second',
      'The first AWS service ever launched was S3 in 2006',
      'Lambda functions can run for up to 15 minutes',
      'DynamoDB uses consistent hashing to distribute data',
    ];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

    // Get some request metadata
    const timestamp = new Date().toISOString();
    const requestId = event.requestContext?.requestId || 'unknown';

    // Calculate something based on input (simple echo with length)
    const inputAnalysis = {
      characterCount: JSON.stringify(body).length,
      hasNestedObjects: Object.values(body).some((val) => typeof val === 'object' && val !== null),
      keyCount: Object.keys(body).length,
    };

    // Return enhanced response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Time': timestamp,
      },
      body: JSON.stringify(
        {
          message: 'Your Lambda function is working!',
          timestamp,
          requestId,
          funFact: randomFact,
          inputAnalysis,
          originalData: body,
          region: process.env.AWS_REGION || 'local',
          memoryUsed: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error processing your request',
        error: error.message,
      }),
    };
  }
};
