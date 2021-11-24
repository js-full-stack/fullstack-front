import { NavLink } from "react-router-dom";
import { useStores } from "../../connection/useStore";
import "./Navigation.scss";

export const Navigation = () => {
  const isAuth = useStores().auth.currentUser;
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => "link" + (isActive ? " activeLink" : "")}
      >
        Home
      </NavLink>

      {isAuth && (
        <>
          {isAuth.role === "couch" && (
            <NavLink
              to="/exercise"
              className={({ isActive }) =>
                "link" + (isActive ? " activeLink" : "")
              }
            >
              Exercises
            </NavLink>
          )}
          <NavLink
            to="/program"
            className={({ isActive }) =>
              "link" + (isActive ? " activeLink" : "")
            }
          >
            Program
          </NavLink>
        </>
      )}
    </nav>
  );
};
