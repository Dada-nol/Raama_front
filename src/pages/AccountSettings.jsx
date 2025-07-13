import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/scss/profil.scss";

function AccountSettings() {
  const { user } = useAuth();

  const navigate = useNavigate();
  // Method de suppression de compte
  const deleteAccount = async () => {
    await axios.delete("http://localhost:8000/api/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    localStorage.removeItem("token");

    navigate("/register");
  };

  return (
    <main className="main-content">
      <div className="account-setting">
        <section>
          <div className="svg">
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
          </div>
          <div>
            <p>{user.name}</p>
          </div>
        </section>
        <section className="container-fluide">
          <h2>Your informations</h2>
          <div>
            <p>Name</p>
            <input type="text" value={user.name} />
            <p>Firstname</p>
            <p>Email</p>
          </div>
          <button onClick={deleteAccount}>Supprimer le compte</button>
        </section>

        <section className="container-fluide">
          <h2>Update password</h2>
          <div>
            <p>Previous password</p>
            <p>New password</p>
            <p>Confirm password</p>
          </div>
        </section>

        <section>
          <button onClick={deleteAccount}>Supprimer le compte</button>
        </section>
      </div>
    </main>
  );
}

export default AccountSettings;
