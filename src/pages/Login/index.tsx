import { initKeycloak, getKeycloak } from "../../utils/utilities/keycloak";

const Login = () => {
  const handleLogin = () => {
    initKeycloak().then((auth: any) => {
      const kc = getKeycloak();
      if (auth) {
        setInterval(() => {
          kc.updateToken(60);
        }, 60000);
      }
    });
  };

  return (
    <section>
      <p>Welcome</p>
      <button onClick={handleLogin}>Login</button>
    </section>
  );
};

export default Login;
