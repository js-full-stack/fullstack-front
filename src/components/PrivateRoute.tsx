import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router";
import { useStores } from "../connection/useStore";

const PrivateRoute = observer(() => {
  const token = localStorage.getItem("token");
  const isAuth = useStores().auth.currentUser;
  return token ? <Outlet /> : <Navigate to="/login" />;
});

export default PrivateRoute;
