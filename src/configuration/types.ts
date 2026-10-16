export type envs = 'develop' | 'staging' | 'release' | 'prod';

export interface ConfigurationType {
  AUTH_API_URL: string;
  CASINO_API_URL: string;
  COINS_API_URL: string;
  CUSTOMER_SERVICE_API_URL: string;
  FINANCE_API_URL: string;
  MEDIA_API_URL: string;
  OPERATOR_API_URL: string;
  CLOUDFARE_ACCESS_CLIENT_ID?: string;
  CLOUDFARE_ACCESS_CLIENT_SECRET?: string;
  CONTENT_API_URL: string;
}
