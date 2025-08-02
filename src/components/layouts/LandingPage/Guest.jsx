import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

function Guest() {
  return (
    <div className="flex flex-col w-full">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Guest;
