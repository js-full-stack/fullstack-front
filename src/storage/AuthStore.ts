import axios from "axios";
import { flow, getSnapshot, Instance, types } from "mobx-state-tree";
import { authHeader } from "../helpers/headerAuth.utils";
import { localStore } from "../helpers/localStorage.utils";
axios.defaults.baseURL = "http://localhost:3000";

export const User = types.model({
  email: types.string,
  firstName: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  phone: types.maybeNull(types.string),
  role: types.maybeNull(types.string),
  id: types.maybeNull(types.identifierNumber),
  token: types.maybeNull(types.string),
});

export const AuthStore = types
  .model({
    currentUser: types.maybe(User),
  })
  // !Register
  .actions((self) => {
    const register = flow(function* (
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      password: string,
      role: string
    ) {
      yield axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
      });
    });

    // !Login
    const login = flow(function* (email: string, password: string) {
      const { data } = yield axios.post("/auth/login", {
        email,
        password,
      });
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      localStore.setToken(data.user.token);

      authHeader.set(data.user.token);
      self.currentUser = data.user;
    });

    // !Logout
    const logout = () => {
      authHeader.unset();
      localStore.removeToken();
      self.currentUser = undefined;
    };
    // !Get profile
    const getCurrentUser = flow(function* () {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = yield axios.get("/profile");
      self.currentUser = data;
    });

    return { register, login, logout, getCurrentUser };
  });

export interface IAuthStore extends Instance<typeof AuthStore> {}
