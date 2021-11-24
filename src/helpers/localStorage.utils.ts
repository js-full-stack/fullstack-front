export const localStore = {
  setToken(token: string) {
    return localStorage.setItem("token", token);
  },
  removeToken() {
    return localStorage.removeItem("token");
  },
  getToken() {
    return localStorage.getItem("token");
  },
};
