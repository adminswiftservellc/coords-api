exports.handler = async function(event, context) {
  const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      code: '1000.b7cb2cce6b7221c558d73949beeb8546.587f54ef46499c8696f50ed19a8b2e30',
      client_id: '1000.W2JHPXAXF4JP2I9X6E6EL1XCC6XH5O',
      client_secret: '22f714eed882774df7a46056d85bd627f20d223386',
      redirect_uri: 'https://localhost',
      grant_type: 'authorization_code'
    })
  });
  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
