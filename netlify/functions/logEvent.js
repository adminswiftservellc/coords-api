exports.handler = async function(event, context) {
  const { lat, lon, eventType } = JSON.parse(event.body);
  
  const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      event_type: eventType,
      date_time: new Date().toISOString(),
      latitude: lat,
      longitude: lon,
      added_user: 'rider'
    })
  });

  const result = await response.json();
  console.log('Supabase response:', JSON.stringify(result));
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
