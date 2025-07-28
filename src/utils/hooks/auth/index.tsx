import { useContext, createContext, useState } from "react";
import type { ChildrenPropsI } from "../../../interface";

interface AuthContextI {
  setToken: (token: string | null) => void;
}

const intialAuthData = {
  token: "",
  setToken: () => {},
};

const createContextAuthContext = createContext<AuthContextI>(intialAuthData);
export const useAuthContext = () => useContext(createContextAuthContext);

const useAuth = () => {
  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return {
    setToken,
  };
};

export const ProvideAuthContext = ({ children }: ChildrenPropsI) => {
  const authContextData = useAuth();
  return (
    <createContextAuthContext.Provider value={authContextData}>
      {children}
    </createContextAuthContext.Provider>
  );
};
