import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

function Guest() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default Guest;
