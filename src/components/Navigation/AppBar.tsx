// *Bootstrap
import NavBar from "react-bootstrap/Navbar";
//

import "./Navigation.scss";

import { observer } from "mobx-react-lite";

import { Navigation } from "../Navigation/Navigation";
import AuthNav from "./AuthNav";
import UserMenu from "./UserMenu";
import { useStores } from "../../connection/useStore";
const AppBar = observer(() => {
  const isAuth = useStores().auth.currentUser;
  return (
    <header>
      <NavBar bg="dark" className="navBar">
        <Navigation />

        {isAuth ? <UserMenu /> : <AuthNav />}
      </NavBar>
    </header>
  );
});

export default AppBar;
