import { initKeycloak, getKeycloak } from "../../utils/utilities/keycloak";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [sessionActiveText, setSessionActiveText] = useState(false);
  //   const handleLogin = () => {
  //     initKeycloak().then((auth: any) => {
  //       const kc = getKeycloak();
  //       if (auth) {
  //         setInterval(() => {
  //           kc.updateToken(60);
  //         }, 60000);
  //       }
  //     });
  //   };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Initialize Keycloak and check if the user is logged in via SSO
      await initKeycloak();
      const kc = getKeycloak();

      if (kc.authenticated) {
        navigate("/login-callback");
      } else {
        kc.login();
      }
    } catch (err) {
      console.log("error", "Login Failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("===== login keycloaks init");
    const triggerKeycloak = async () => {
      await initKeycloak();
      const kc = getKeycloak();

      if (kc.authenticated) {
        setSessionActiveText(true);
      } else {
        setSessionActiveText(false);
      }
    };

    triggerKeycloak();
  }, [sessionActiveText]);

  return (
    <section>
      <p>Welcome</p>
      <button onClick={handleLogin}>
        {loading
          ? "Checking SSO..."
          : sessionActiveText
          ? "Go to Dashboard"
          : "Login"}
      </button>
    </section>
  );
};

export default Login;
