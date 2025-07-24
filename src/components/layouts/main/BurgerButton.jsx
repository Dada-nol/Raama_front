import { useState } from "react";
import logo from "../../../assets/img/logo.png";
import SideBar from "./SideBar";
import ProfilButton from "./ProfilButton";

function BurgerButton() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSideBar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <aside className="w-64">
      <div className="flex items-center gap-8 ml-2">
        <a href="/home">
          <img src={logo} alt="Pandaraama" className="" style={{ width: 80 }} />
        </a>

        <button className="hover:shadow-custom" onClick={handleSideBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-6 hover:text-[#64B000]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <SideBar expanded={isSidebarExpanded}></SideBar>
      <ProfilButton></ProfilButton>
    </aside>
  );
}

export default BurgerButton;
