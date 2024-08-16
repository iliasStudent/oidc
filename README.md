# Samenvatting

IAM (Identity and Access Management) wordt gebruikt om de toegang en rechten binnen een organisatie te beheren. Hierbij worden gebruikers geauthentiseerd en geautoriseerd, zodat ze veilig toegang kunnen krijgen tot resources.

Authenticatie is het proces waarbij wordt geverifieerd dat de gebruiker is wie hij beweert te zijn, en autorisatie is het proces waarbij wordt bepaald tot welke resources de geauthentiseerde gebruiker toegang heeft, op basis van zijn rechten.

Auth0 is een IAM-oplossing die gebruik maakt van de protocollen OIDC (OpenID Connect) voor authenticatie en OAuth2 voor authorisatie.

Voor deze opdracht wordt er gebruik gemaakt van een SPA (Single Page Application) met Angular als front-end en Node.js als back-end. De gebruiker logt in op de applicatie (SPA) met behulp van het OIDC (OpenID Connect) protocol. Na een succesvolle login ontvangt de SPA een ID-token van OIDC. Dit ID-token bevestigt de identiteit van de gebruiker. Vervolgens wordt het OAuth 2.0 protocol gebruikt voor autorisatie, zodat de gebruiker toegang krijgt tot de API's. Na een succesvolle autorisatie ontvangt de SPA een access token van OAuth 2.0, waarmee de SPA toegang kan krijgen tot de beveiligde API's en resources aan de hand van de rechten van de gebruiker.

PDP (Policy Decision Point) neemt de beslissing of een gebruiker toegang heeft tot bepaalde resources op basis van beleidsregels en gebruikersattributen.

PEP (Policy Enforcement Point) voert de beslissing uit die door de PDP is genomen. Dus PEP verleent of weigert toegang tot de resources voor de gebruiker op basis van de beslissing van de PDP.

In deze opdracht is OPA (Open Policy Agent) de PDP.

# OpenID Connect Single Page Application (SPA) with Angular and Node.js

## Overview

This project is a Single Page Application (SPA) that implements OpenID Connect (OIDC) authentication using Angular for the front end and Node.js for the back end. The authentication flow involves obtaining an ID token and an access token for secure and authorized communication with the server.

## Features

- **Angular Frontend**: A responsive and dynamic user interface built with Angular.
- **Node.js Backend**: A secure backend server implemented with Node.js to handle authentication and authorization.
- **OpenID Connect (OIDC)**: Implements the OIDC authentication flow for secure user authentication.
- **ID Token and Access Token**: Uses ID tokens for user authentication and access tokens for secure communication with the backend.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version x.x.x)
- [Angular CLI](https://cli.angular.io/) (version x.x.x)

# Login in to Auth0
```typescript
  login(): Observable<any> {
    const params = new URLSearchParams();
    params.set('response_type', 'code');
    params.set('client_id', 'lDpFkylmWzyauZsuGuYlHD8zx9uWZ3rd');
    params.set('redirect_uri', 'http://localhost:4200/callbackauth');
    params.set('scope', 'openid profile email');
    params.set('audience', 'http://localhost:4200/weather');
    params.set('state', 'Bankoko');
  
    const authorizationUrl = `https://dev-vjf815mo6cnziql2.eu.auth0.com/authorize?${params.toString()}`;
    
    window.location.href = authorizationUrl;
    return of(null); 
  }
```
# Get access token after authenticating with authorization code from Auth0
``` typescript 
getAccessToken(authorizationCode: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', 'lDpFkylmWzyauZsuGuYlHD8zx9uWZ3rd');
    body.set('client_secret', 'P_A47XvfiiLGpNEw4_QBmyW1HufTpUB2_ITZE2FsPX2rZuhpp0yaUluft7ww-Bfo');
    body.set('code', authorizationCode);
    body.set('redirect_uri', "http://localhost:4200/callbackauth");
    body.set('state','Bankoko');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post("https://dev-vjf815mo6cnziql2.eu.auth0.com/oauth/token/", body.toString(), { headers: headers });
  }
```

# Passing the access token to API
```javascript
getCurrentWeather(city: string, access_token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access_token} `
    });
    return this.http.get<weatherData>(this.apiUrl + city, {headers});
  }
```
