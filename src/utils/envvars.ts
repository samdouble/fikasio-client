export const getEnvVariable = (key: string): string => {
  // @ts-ignore
  return window._env_?.[key] ?? process.env[key] ?? '';
};

export const envvars = {
  apiServer: getEnvVariable('REACT_APP_API_SERVER'),
  googleAnalyticsId: getEnvVariable('REACT_APP_GOOGLE_ANALYTICS_ID'),
  googleOAuthClientId: getEnvVariable('REACT_APP_GOOGLE_OAUTH_CLIENT_ID'),
  stripeConfirmationUrl: getEnvVariable('REACT_APP_STRIPE_CONFIRMATION_URL'),
  stripePublishKey: getEnvVariable('REACT_APP_STRIPE_PUBLISH_KEY'),
  urlDocumentation: getEnvVariable('REACT_APP_URL_DOCUMENTATION'),
  urlPrivacy: getEnvVariable('REACT_APP_URL_PRIVACY'),
  urlToS: getEnvVariable('REACT_APP_URL_TOS'),
  urlWebsite: getEnvVariable('REACT_APP_URL_WEBSITE'),
  websocketServer: getEnvVariable('REACT_APP_WEBSOCKET_SERVER'),
};

export default envvars;
