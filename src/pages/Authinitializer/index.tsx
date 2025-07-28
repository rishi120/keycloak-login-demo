import { useEffect } from "react";
import { useNavigate } from "react-router";

import { initKeycloak, getKeycloak } from "../../utils/utilities/keycloak";
import { useAuthContext } from "../../utils/hooks";

const AuthInitializer = () => {
  const { setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleExistingToken = (token: string) => {
      setToken(token);
    };

    const handleKeycloakAuth = async () => {
      console.log("====== new login");
      const authenticated = await initKeycloak();
      const kc = getKeycloak();

      if (!authenticated || !kc.token) {
        return;
      }

      // Store the refresh token if available
      if (kc.refreshToken) {
        localStorage.setItem("refreshToken", kc.refreshToken);
      }

      // Set the access token and mark auth as ready
      setToken(kc.token);

      // Start automatic token refresh
      startTokenRefresh(kc);
    };

    const startTokenRefresh = (kc: any) => {
      const interval = setInterval(async () => {
        try {
          const refreshed = await kc.updateToken(60);
          if (refreshed && kc.token) {
            setToken(kc.token);
          }
        } catch (error) {
          console.warn("Token refresh failed:", error);
        }
      }, 60_000);

      // Cleanup on window unload
      window.addEventListener("beforeunload", () => clearInterval(interval));
    };

    const run = async () => {
      console.log("===== function running");
      try {
        const existingToken = localStorage.getItem("token");

        if (existingToken) {
          console.log("====== existing login");
          // Token exists, no need for login
          handleExistingToken(existingToken);
          return;
        }

        // If no token, proceed with Keycloak login
        await handleKeycloakAuth();
      } catch (error) {
        console.error("Keycloak initialization error:", error);
      }
    };

    run();
  }, [setToken]);

  return null;
};

export default AuthInitializer;
