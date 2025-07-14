import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PivateRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/layouts/LandingPage/Layout";
import LayoutAuth from "./components/layouts/auth/LayoutAuth";
import MainLayout from "./components/layouts/main/Layout";
import Transition from "./components/transitions/Transition";
import { useAuth } from "./context/AuthContext";
import AccountSettings from "./pages/AccountSettings";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Profil from "./pages/Profil";
import Create from "./pages/Souvenirs/Create";
import List from "./pages/Souvenirs/List";
import Show from "./pages/Souvenirs/Show";
import Update from "./pages/Souvenirs/Update";

function Router() {
  /* const staticRoutes = [
  { path: "/Accessibilité", title: "Accessibilité" },
  { path: "/Contact", title: "Contact" },
  { path: "/Données-personnelles", title: "Données personnelles" },
  { path: "/Marchés", title: "Marchés" },
  { path: "/Mentions-légales", title: "Mentions légales" },
  { path: "/Presse", title: "Presse" },
  { path: "/Région", title: "Région" },
]; */

  /* {staticRoutes.map(({ path, title }) => (
  <Route key={path} path={path} element={<PageVide title={title} />} />
))} */

  const { loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Attend 700ms que l’animation "fade-out" finisse
      const timeout = setTimeout(() => setShowLoader(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (showLoader) return <Transition />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
        </Route>
        <Route element={<LayoutAuth />}>
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="profil"
            element={
              <PrivateRoute>
                <Profil />
              </PrivateRoute>
            }
          />
          <Route
            path="account-setting"
            element={
              <PrivateRoute>
                <AccountSettings />
              </PrivateRoute>
            }
          />
          <Route path="souvenir">
            <Route
              index
              element={
                <PrivateRoute>
                  <List></List>
                </PrivateRoute>
              }
            />
            <Route
              path=":id"
              element={
                <PrivateRoute>
                  <Show></Show>
                </PrivateRoute>
              }
            />
            <Route
              path="create"
              element={
                <PrivateRoute>
                  <Create></Create>
                </PrivateRoute>
              }
            />
            <Route
              path=":id/update"
              element={
                <PrivateRoute>
                  <Update></Update>
                </PrivateRoute>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
