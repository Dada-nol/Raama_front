import { useState } from "react";
import logo from "../../../assets/img/logo.png";
import SideBar from "./SideBar";
import ProfilButton from "./ProfilButton";

function BurgerButton() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleSideBar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <aside
      className={`sidebar ${
        isSidebarExpanded ? "expanded gradient-r-border" : "collapsed"
      }`}
    >
      <div className="sidebar-header">
        <img
          onClick={handleSideBar}
          src={logo}
          alt="Pandaraama"
          className="logo"
        />

        <button
          onClick={handleSideBar}
          className="toggle-button hover:shadow-[0_0_10px_2px_#64b000]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <SideBar expanded={isSidebarExpanded} />
      <ProfilButton expanded={isSidebarExpanded} />
    </aside>
  );
}

export default BurgerButton;
