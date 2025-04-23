// CREDITS: CHATGPT

let accessToken = null;
let expiresAt = null;

async function fetchAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    accessToken = data.access_token;
    // Stel de vervaltijd in (in ms), met wat marge
    expiresAt = Date.now() + (data.expires_in - 60) * 1000;
  } else {
    throw new Error('Kon geen access token ophalen');
  }
}

async function getAccessToken() {
  if (!accessToken || Date.now() > expiresAt) {
    await fetchAccessToken();
  }
  return accessToken;
}

export default getAccessToken;
