import { Outlet } from "react-router-dom";
import SideBar from "./app/SideBar";
// import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <SideBar />
      <main className="flex-1 overflow-y-auto text-center bg-background">
        <div className="flex items-center justify-between p-4 border-b border-neutral-700 shadow-sm">
          <h1 className="text-gradient w-fit text-3xl font-bold tracking-wide">
            Raama
          </h1>
          {/* <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:shadow-[0_0_10px_2px_#64b000] transition-shadow duration-200">
            <button className="p-2">?</button>
          </div> */}
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
