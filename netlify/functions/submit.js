const AIRTABLE_API_KEY = 'patFlbergLmgbVjzY.63c492429097f437368effd8011539e20c22e0dec2ca1a2a2f9f873b2bef53a3';
const AIRTABLE_BASE_ID = 'apphCeBBITTuh5pb5';
const AIRTABLE_TABLE_NAME = 'Leadership Responses';

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields: data })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Airtable error:', result);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: result.error || 'Airtable error' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: result.id })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
