const isProduction = process.env.NODE_ENV === "production";

export const VITE_API_SERVER_URL = "https://api.ironcloud.pacewisdom.in/";
export const VITE_API_KEYCLOCK_URL = "https://keycloak.pacewisdom.in/";
export const VITE_API_KEYCLOCK_REALM = "IC-SAAS";
export const VITE_API_CLIENT_ID = isProduction ? "dev-main-app" : "main-app";
