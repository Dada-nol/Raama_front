import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Create from "./components/Souvenirs/Create";
import Update from "./components/Souvenirs/Update";
import Login from "./components/User/Login";
import Logout from "./components/User/Logout";
import Register from "./components/User/Register";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Souvenirs from "./pages/Souvenirs";

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
          <Route index element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/profil" element={<Profil />}></Route>
          <Route path="souvenirs" element={<Souvenirs></Souvenirs>}></Route>
          <Route path="souvenir-create" element={<Create></Create>}></Route>
          <Route path="souvenir/:id/update" element={<Update></Update>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
