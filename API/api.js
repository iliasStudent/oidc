const express = require('express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const axios = require('axios');

const apiUrl = 'http://api.weatherapi.com/v1/current.json';
const apiKey = '270fd59ba8804655885135026241508';

const cors = require('cors');
const { request } = require('http');
const app = express();
app.use(cors());
const client = jwksClient({
  jwksUri: 'https://dev-7qvir82wwwaaewg7.us.auth0.com/.well-known/jwks.json' // Replace with your Auth0 domain
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

//OPA check functie
async function checkOPAPolicy(permissions) {
  console.log('Checking OPA with permissions:', permissions);
  try {
    const response = await axios.post('http://localhost:8181/v1/data/example/allow', {
      input: { permissions: permissions }
    });
    return response.data.result;
  } catch (error) {
    console.error('Error communicating with OPA:', error);
    return false;
  }
}
//OPA check functie

app.get('/api/weather/:city', async (req, res) => {
  //console.log(req.params["city"]);
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  jwt.verify(token, getKey, async function(err, decoded) {
    if (err) {
      return res.status(403).send('Forbidden: Invalid token');
    }

    //TEST
    console.log('Decoded JWT:', decoded);
    //TEST

    //OPA integratie
    const permissions = decoded.permissions || [];
    const isAllowed = await checkOPAPolicy(permissions);

    if (isAllowed) {
        //console.log(getCurrentWeather(req.params["city"]));
      return res.send(await getCurrentWeather(req.params["city"]));
    } else {
      return res.status(403).send('Forbidden: Access denied by OPA');
    }
    //OPA integratie
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});