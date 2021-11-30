import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useStores } from "../connection/useStore";

// useEffect(() => {
//   isAuth.getCurrentUser();
// }, []);

const PrivateRoute = observer(() => {
  const token = localStorage.getItem("token");


  return token ? <Outlet /> : <Navigate to="/login" />;
});

export default PrivateRoute;
