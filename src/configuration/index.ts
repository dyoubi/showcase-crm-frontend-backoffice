import * as t from './types';

// for inject the env variable we are using
// this plugin https://iendeavor.github.io/import-meta-env/
// with this plugin we can inject our envs variable in the runtime
export const configuration: t.ConfigurationType = {
  AUTH_API_URL: import.meta.env.AUTH_API_URL,
  CASINO_API_URL: import.meta.env.CASINO_API_URL,
  COINS_API_URL: import.meta.env.COINS_API_URL,
  CUSTOMER_SERVICE_API_URL: import.meta.env.CUSTOMER_SERVICE_API_URL,
  FINANCE_API_URL: import.meta.env.FINANCE_API_URL,
  // @deprecated use CONTENT_API_URL instead
  MEDIA_API_URL: import.meta.env.MEDIA_API_URL,
  OPERATOR_API_URL: import.meta.env.OPERATOR_API_URL,
  CLOUDFARE_ACCESS_CLIENT_ID: import.meta.env.CLOUDFARE_ACCESS_CLIENT_ID,
  CLOUDFARE_ACCESS_CLIENT_SECRET: import.meta.env.CLOUDFARE_ACCESS_CLIENT_SECRET,
  CONTENT_API_URL: import.meta.env.CONTENT_API_URL,
} as const;
