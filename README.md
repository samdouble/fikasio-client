# fikasio-client

### Development

Create an environment variables file named `.env.client`:
```
ESLINT_NO_DEV_ERRORS=true
NODE_ENV=development

REACT_APP_API_SERVER=https://api.fikas.io
REACT_APP_GOOGLE_ANALYTICS_ID=
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=
REACT_APP_STRIPE_CONFIRMATION_URL=https://app.fikas.io/settings
REACT_APP_STRIPE_PUBLISH_KEY=
REACT_APP_URL_DOCUMENTATION=https://fikas.io/docs/intro
REACT_APP_URL_PRIVACY=https://fikas.io/privacy
REACT_APP_URL_TOS=https://fikas.io/tos
REACT_APP_URL_WEBSITE=https://fikas.io
REACT_APP_WEBSOCKET_SERVER=wss://api.fikas.io/
```

Create an environment variables file named `.env.server`:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=
MONGO_URL=mongodb://mongo0:27017,mongo1:27017,mongo2:27017/?replicaSet=rs0
NODE_ENV=development
STRIPE_SECRET_KEY=
```

Run the following command:
```
./app dev
```
