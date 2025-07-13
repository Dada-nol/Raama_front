import { useState } from "react";
import logo from "../../../assets/img/logo.png";
import SideBar from "../SideBar";

function NavBar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [display, setDisplay] = useState("none");

  const handleSideBar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const handleProfil = () => {
    if (display === "none") {
      setDisplay("flex");
    } else setDisplay("none");
  };
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-left ">
          <button className="btn-circle" onClick={handleSideBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <a href="/home">
            <img
              src={logo}
              alt="Pandaraama"
              className="logo"
              style={{ width: 80 }}
            />
          </a>
          <SideBar expanded={isSidebarExpanded}></SideBar>
        </div>
        <div className="navbar-right">
          <button className=" btn-circle" onClick={handleProfil}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          <div className="profil-links" style={{ display: display }}>
            <a href="/profil">Profil</a>
            <hr></hr>
            <a href="/account-setting">Paramètre du compte</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
