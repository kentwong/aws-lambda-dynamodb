export const handler = async (event) => {
    const method = event?.requestContext?.http?.method || 'UNKNOWN';

    if (method !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Allow': 'POST' },
            body: JSON.stringify({ error: `Method ${method} Not Allowed` })
        };
    }

    const body = JSON.parse(event.body || '{}');

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "POST method accepted",
            youSent: body
        })
    };
};
