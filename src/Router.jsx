import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/AppLayout";
import Guest from "./components/layouts/GuestLayout";
import PrivateRoute from "./components/PivateRoute";
import PublicRoute from "./components/PublicRoute";
import Transition from "./components/transitions/Transition";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import InvitePage from "./pages/InvitePage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import AccountSettings from "./pages/profil/AccountSettings";
import Profil from "./pages/profil/Profil";
import Create from "./pages/souvenirs/Create";
import List from "./pages/souvenirs/List";
import SouvenirEntries from "./pages/souvenirs/SouvenirEntries";

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
    <Routes>
      <Route path="/" element={<Guest />}>
        <Route
          index
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
      </Route>

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
                <SouvenirEntries></SouvenirEntries>
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
        </Route>
      </Route>

      <Route path="/invite/:token" element={<InvitePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
