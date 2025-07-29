import Keycloak from "keycloak-js";

import {
  VITE_API_CLIENT_ID,
  VITE_API_KEYCLOCK_REALM,
  VITE_API_KEYCLOCK_URL,
} from "../../constants/env-data";

let keycloakInstance: Keycloak | undefined;
let initPromise: Promise<boolean> | undefined;

/** Initialize Keycloak and return the promise */
export const initKeycloak = (): Promise<boolean> => {
  // Ensure that all the environment variables are set.
  if (
    !VITE_API_KEYCLOCK_URL ||
    !VITE_API_KEYCLOCK_REALM ||
    !VITE_API_CLIENT_ID
  ) {
    throw new Error(
      "Missing Keycloak configuration. Please check your environment variables."
    );
  }

  // If Keycloak instance does not exist, create a new one.
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: VITE_API_KEYCLOCK_URL,
      realm: VITE_API_KEYCLOCK_REALM,
      clientId: VITE_API_CLIENT_ID,
    });
  }

  // If initPromise is not set, initialize it using keycloakInstance.init.
  if (!initPromise) {
    initPromise = keycloakInstance.init({
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      onLoad: "check-sso", // Check if the user is already authenticated using SSO
      pkceMethod: "S256", // Use PKCE method for security during OAuth flows
    });
  }

  // Return the initPromise (this will be the same promise after initialization).
  return initPromise;
};

/** Safely access initialized Keycloak instance */
export const getKeycloak = (): Keycloak => {
  if (!keycloakInstance) {
    throw new Error(
      "Keycloak has not been initialized. Call initKeycloak() first."
    );
  }
  return keycloakInstance;
};
