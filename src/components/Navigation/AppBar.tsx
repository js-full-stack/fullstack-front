// *Bootstrap
import NavBar from "react-bootstrap/Navbar";
//

import "./Navigation.scss";
import { observer } from "mobx-react-lite";

import { Navigation } from "../Navigation/Navigation";
import AuthNav from "./AuthNav";
import UserMenu from "./UserMenu";
import { useStores } from "../../connection/useStore";
import { useEffect } from "react";
const AppBar = observer(() => {
  const isAuth = useStores().auth;

  return (
    <header>
      <NavBar bg="dark" className="navBar">
        <Navigation />

        {isAuth.currentUser ? <UserMenu /> : <AuthNav />}
      </NavBar>
    </header>
  );
});

export default AppBar;
