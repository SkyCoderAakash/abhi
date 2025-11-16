const serverURL = import.meta.env.VITE_BACKEND_URL;

export const BACKEND_URL = {
  login: serverURL + "api/auth/login",
  logout: serverURL + "api/auth/logout",
  register: serverURL + "api/auth/register",
  me: serverURL + "api/auth/me"
};
