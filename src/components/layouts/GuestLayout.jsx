import { Outlet } from "react-router-dom";
import Footer from "./guest/Footer";
import Nav from "./guest/Nav";

function GuestLayout() {
  return (
    <div className="flex flex-col w-full">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default GuestLayout;
