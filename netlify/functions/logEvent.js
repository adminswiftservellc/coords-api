exports.handler = async function(event, context) {
  const { lat, lon, eventType } = JSON.parse(event.body);
  
  // Get fresh access token
  const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token'
    })
  });
  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Log to Zoho
  const zohoResponse = await fetch('https://creator.zoho.com/api/v2/admin_swiftservellc/event-log/form/Event_Log1', {
    method: 'POST',
    headers: {
      'Authorization': 'Zoho-oauthtoken ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        Event_Type: eventType,
        Date_Time: new Date().toISOString(),
        Latitude: lat,
        Longitude: lon
      }
    })
  });
const result = await zohoResponse.json();
  console.log('Zoho response:', JSON.stringify(result));
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
