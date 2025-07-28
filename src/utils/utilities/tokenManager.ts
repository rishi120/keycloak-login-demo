let currentToken: string | null = localStorage.getItem("token");

export const getAccessToken = () =>
  currentToken ?? localStorage.getItem("token");

export const setAccessToken = (token: string | null) => {
  currentToken = token;
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
