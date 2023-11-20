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
```typescript:
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
```typescript: 
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
