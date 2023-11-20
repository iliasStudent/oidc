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

## Getting Started

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/oidc-angular-nodejs-spa.git
    cd oidc-angular-nodejs-spa
    ```

2. **Install Dependencies**:

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Configure OIDC Settings**:

    Update the OIDC settings in both the frontend and backend configurations to match your OIDC provider's configuration.

    - **Frontend Configuration**: Update `src/app/auth/auth.config.ts`.
    - **Backend Configuration**: Update `backend/config.js`.

4. **Run the Application**:

    ```bash
    # Run the backend server
    cd ../backend
    npm start

    # Run the frontend application
    cd ../frontend
    ng serve
    ```

    Access the application at `http://localhost:4200/`.

## OIDC Configuration

Ensure you have the necessary OIDC client credentials and update the configurations accordingly. Refer to your OIDC provider's documentation for more details.

### Frontend Configuration

```typescript
export const authConfig = {
  clientId: 'your-client-id',
  issuer: 'your-issuer-url',
  redirectUri: 'http://localhost:4200/callback',
  scopes: 'openid profile email',
};
