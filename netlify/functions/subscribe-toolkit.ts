/**
 * Netlify Function: Subscribe to Toolkit
 *
 * POST: Save email to NocoDB and return download link
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const NOCODB_BASE_URL = 'https://noco.aimindset.org';
// Use environment variable for table ID, with fallback
const NOCODB_EMAIL_TABLE_ID = process.env.NOCODB_EMAIL_TABLE_ID || '';

interface SubscribeRequest {
  email: string;
  source?: string;
}

const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  let body: SubscribeRequest;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Invalid JSON body' }),
    };
  }

  const { email, source = 'aim-report-toolkit' } = body;

  if (!email || !email.includes('@')) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Valid email required' }),
    };
  }

  const nocodbToken = process.env.NOCODB_API_TOKEN;
  if (!nocodbToken) {
    console.error('[subscribe-toolkit] NOCODB_API_TOKEN not configured');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Server configuration error' }),
    };
  }

  if (!NOCODB_EMAIL_TABLE_ID) {
    console.error('[subscribe-toolkit] NOCODB_EMAIL_TABLE_ID not configured');
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Server configuration error' }),
    };
  }

  try {
    // Check if email already exists
    const checkUrl = `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_EMAIL_TABLE_ID}/records?where=${encodeURIComponent(`(email,eq,${email})`)}`;

    const checkResponse = await fetch(checkUrl, {
      headers: { 'xc-token': nocodbToken, 'Content-Type': 'application/json' },
    });

    if (checkResponse.ok) {
      const checkData = await checkResponse.json() as { list: Array<{ email: string }> };
      if (checkData.list && checkData.list.length > 0) {
        // Email already exists - still return success
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            message: 'Already subscribed',
            downloadUrl: '/downloads/aim-style-toolkit.zip',
          }),
        };
      }
    }

    // Create new subscription record
    const createUrl = `${NOCODB_BASE_URL}/api/v2/tables/${NOCODB_EMAIL_TABLE_ID}/records`;

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: { 'xc-token': nocodbToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        status: source, // Use status field to track source
        name: 'AIM Report Reader',
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('[subscribe-toolkit] NocoDB create error:', errorText);
      throw new Error(`NocoDB error: ${createResponse.status}`);
    }

    console.log(`[subscribe-toolkit] New subscription: ${email} from ${source}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Subscribed successfully',
        downloadUrl: '/downloads/aim-style-toolkit.zip',
      }),
    };
  } catch (err) {
    console.error('[subscribe-toolkit] Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Failed to subscribe' }),
    };
  }
};

export { handler };
