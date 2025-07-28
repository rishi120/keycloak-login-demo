import { Navigate } from "react-router-dom";
import type { ChildrenPropsI } from "../interface";
import { getAccessToken } from "../utils/utilities/tokenManager";

const PrivateRoute = ({ children }: ChildrenPropsI) => {
  const token = getAccessToken();
  console.log(token, "==== token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
