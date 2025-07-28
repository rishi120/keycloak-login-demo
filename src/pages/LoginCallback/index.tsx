import { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthInitializer from "../Authinitializer";

import "./login-callback.css";

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }, []);

  return (
    <>
      <AuthInitializer />
      <section className="loader">
        <p>Loading Modules...</p>
      </section>
    </>
  );
};

export default LoginCallback;
