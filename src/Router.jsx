import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="profil" element={<Profil />} />
        <Route path="home" element={<Home />} />
        <Route path="souvenirs">
          <Route index element={<List></List>} />
          <Route path=":id" element={<Show></Show>} />
          <Route path="create" element={<Create></Create>} />
          <Route path=":id/update" element={<Update></Update>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
