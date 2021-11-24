import "./Navigation.scss";
import { NavLink } from "react-router-dom";

const AuthNav = () => (
  <>
    <NavLink
      to="/register"
      className={({ isActive }) => "link" + (isActive ? " activeLink" : "")}
    >
      Registration
    </NavLink>

    <NavLink
      to="/login"
      className={({ isActive }) => "link" + (isActive ? " activeLink" : "")}
    >
      Login
    </NavLink>
  </>
);

export default AuthNav;
