import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useStores } from "./connection/useStore";
import { observer } from "mobx-react";

// !Components
import PrivateRoute from "./components/PrivateRoute";
import AppBar from "./components/Navigation/AppBar";
const HomeView = lazy(() => import("./views/HomeView"));
const RegistrationView = lazy(() => import("./views/RegistrationView"));
const LoginView = lazy(() => import("./views/LoginVIew"));
const ProgramView = lazy(() => import("./views/ProgramsView"));
const ExerciseView = lazy(() => import("./views/ExerciseView"));
const ExerciseEditor = lazy(
  () => import("./components/Exercise/ExerciseEditor")
);

const App = observer(() => {
  const authStore = useStores().auth;
  useEffect(() => {
    authStore.getCurrentUser();
  }, []);
  return (
    <>
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <AppBar />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/register" element={<RegistrationView />} />
            <Route path="/login" element={<LoginView />} />
            <Route element={<PrivateRoute />}>
              <Route path="/program" element={<ProgramView />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/exercise" element={<ExerciseView />} />
            </Route>
          </Routes>
        </Suspense>
        <ToastContainer />
      </Container>
    </>
  );
});

export default App;
