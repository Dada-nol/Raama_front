import { useState } from "react";
import LogoutButton from "../../ui/LogoutButton";

function ProfilButton() {
  const [display, setDisplay] = useState("none");

  const handleProfil = () => {
    if (display === "none") {
      setDisplay("flex");
    } else setDisplay("none");
  };

  return (
    <>
      {" "}
      <div className="absolute bottom-10 left-3">
        <button className="" onClick={handleProfil}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <div className="profil-links" style={{ display: display }}>
          <a href="/profil">Profil</a>
          <hr></hr>
          <a href="/account-setting">Paramètre du compte</a>
          <hr></hr>
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </>
  );
}

export default ProfilButton;
