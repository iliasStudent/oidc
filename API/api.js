const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const axios = require('axios');

const apiUrl = 'http://api.weatherapi.com/v1/current.json';
const apiKey = '6a060dcf7d41496db2802622231811';

const cors = require('cors');
const { request } = require('http');
const app = express();
app.use(cors());
const client = jwksClient({
  jwksUri: 'https://dev-vjf815mo6cnziql2.eu.auth0.com/.well-known/jwks.json' // Replace with your Auth0 domain
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function getCurrentWeather(city) {
    const url = `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`;
  
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error) {
      // Handle error, e.g., log it or throw a custom error
      console.error('Error fetching weather data:', error.message);
      throw error;
    }
  }

app.get('/api/weather/:city', async (req, res) => {
  console.log(req.params["city"]);
  const token = req.headers['authorization']?.split(' ')[1];
  console.log(req);
  console.log(req.body);
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  jwt.verify(token, getKey, async function(err, decoded) {
    if (err) {
      return res.status(403).send('Forbidden: Invalid token');
    }

    if (decoded && decoded.permissions && decoded.permissions.includes('read:weather')) {
        console.log(getCurrentWeather(req.params["city"]));
      return res.send(await getCurrentWeather(req.params["city"]));
    } else {
      return res.status(403).send('Forbidden: Missing "api" permission');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});