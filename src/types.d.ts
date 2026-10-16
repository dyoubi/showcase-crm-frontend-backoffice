/// <reference types="vite/client" />

interface ImportMetaEnv {
  CASINO_API_URL: string;
  // @deprecated use CONTENT_API_URL instead
  MEDIA_API_URL: string;
  OPERATOR_API_URL: string;
  CLOUDFARE_ACCESS_CLIENT_ID: string;
  CLOUDFARE_ACCESS_CLIENT_SECRET: string;
  AUTH_API_URL: string;
  CONTENT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
