import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
// import Footer from "./Footer";

function Layout() {
  return (
    <>
      <SideBar />
      <main className="flex-1 overflow-y-auto text-center">
        <div className="flex items-center justify-between p-4 mb-4">
          <h1 className="text-gradient w-fit text-[26px]">Raama</h1>
          <div className="w-10 h-10 border rounded-[50px]">
            <button className="p-2">?</button>
          </div>
        </div>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
