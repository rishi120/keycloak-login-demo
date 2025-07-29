import ModuleWrapper from "../../layout";
import { initKeycloak, getKeycloak } from "../../utils/utilities/keycloak";

const Dashboard = () => {
  const handleKeycloakLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    initKeycloak();
    const kc = getKeycloak();
    kc.clearToken();
    kc.logout({
      redirectUri: window.location.origin + "/",
    });
  };

  return (
    <ModuleWrapper>
      <h1>Welcome to Keycloaks demo</h1>
      <button onClick={handleKeycloakLogout}>Logout</button>
    </ModuleWrapper>
  );
};

export default Dashboard;
