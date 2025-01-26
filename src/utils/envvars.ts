export const envvars = {
  apiServer: process.env.REACT_APP_API_SERVER!,
  googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID!,
  googleOAuthClientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID!,
  stripeConfirmationUrl: process.env.REACT_APP_STRIPE_CONFIRMATION_URL!,
  stripePublishKey: process.env.REACT_APP_STRIPE_PUBLISH_KEY!,
  urlDocumentation: process.env.REACT_APP_URL_DOCUMENTATION!,
  urlPrivacy: process.env.REACT_APP_URL_PRIVACY!,
  urlToS: process.env.REACT_APP_URL_TOS!,
  urlWebsite: process.env.REACT_APP_URL_WEBSITE!,
  websocketServer: process.env.REACT_APP_WEBSOCKET_SERVER!,
};

export default envvars;
