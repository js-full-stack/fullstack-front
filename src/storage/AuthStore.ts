import axios from "axios";
import { flow, Instance, types } from "mobx-state-tree";
import { authHeader } from "../helpers/headerAuth.utils";
import { localStore } from "../helpers/localStorage.utils";
import { ProgramModel } from "./ProgramsStore";
axios.defaults.baseURL = "http://localhost:3000";

export const UserModel = types.model({
  email: types.string,
  firstName: types.maybeNull(types.string),
  lastName: types.maybeNull(types.string),
  phone: types.maybeNull(types.string),
  role: types.maybeNull(types.string),
  id: types.maybeNull(types.identifierNumber),
});

export const AuthStore = types
  .model({
    currentUser: types.maybe(UserModel),
    allUsers: types.array(UserModel),
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
      localStore.setToken(data.user.token);

      authHeader.set(data.user.token);
      self.currentUser = data.user;
    });

    // !Logout
    const logout = function () {
      // yield axios.get("/logout");
      authHeader.unset();
      localStore.removeToken();
      self.currentUser = undefined;
    };
    // ! Get all users
    const getAllUsers = flow(function* () {
      const { data } = yield axios.get("/user");
      self.allUsers = data;
    });

    // !Get current user
    const getCurrentUser = flow(function* () {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = yield axios.get("/profile");
      self.currentUser = data;

      // const currentUser = self.allUsers.find((user) => user.id === data);
      // self.currentUser = currentUser;
    });

    return {
      register,
      login,
      logout,
      getAllUsers,
      getCurrentUser,
    };
  });

export interface IAuthStore extends Instance<typeof AuthStore> {}
