import { Outlet } from "react-router-dom";
import NavBar from "./BurgerButton";
// import Footer from "./Footer";

function Layout() {
  return (
    <>
      <NavBar />
      <main className="flex-1 overflow-y-auto text-center">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
