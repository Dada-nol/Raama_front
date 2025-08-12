import { useState } from "react";
import logo from "../../../assets/img/logo.png";
import SocialIcons from "../../ui/SocialIcons";
import NavLinks from "./NavLinks";
import ProfilButton from "./ProfilButton";

function SideBar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSideBar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <aside
      className={`sidebar transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? "expanded gradient-r-border" : "collapsed"
      }`}
    >
      <div
        className={`sidebar-header flex items-center justify-between px-2 py-3  ${
          isSidebarExpanded ? "border-b border-neutral-700" : ""
        }`}
      >
        <img
          onClick={handleSideBar}
          src={logo}
          alt="Pandaraama"
          className="logo cursor-pointer hover:scale-105 transition-transform duration-200"
        />

        <button
          onClick={handleSideBar}
          className="toggle-button hover:shadow-[0_0_10px_2px_#64b000] p-2 rounded-lg transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <NavLinks expanded={isSidebarExpanded} />
      <ProfilButton expanded={isSidebarExpanded} />

      <div
        className={`absolute bottom-2 translate-x-20 ${
          isSidebarExpanded ? "expanded" : "hidden"
        }`}
      >
        <SocialIcons />
      </div>
    </aside>
  );
}

export default SideBar;
