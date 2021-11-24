import axios from "axios";
export const authHeader = {
  set(token: string) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  },
  unset() {
    return (axios.defaults.headers.common.Authorization = "");
  },
};
