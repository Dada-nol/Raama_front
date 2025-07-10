import { Outlet } from "react-router-dom";
import Footer from "../Footer";

function LayoutAuth() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default LayoutAuth;
