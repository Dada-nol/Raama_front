import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/scss/profil.scss";

function AccountSettings() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setFirstname(user.firstname);
      setEmail(user.email);
      setPseudo(user.pseudo);
    }
  }, [user]);

  const UpdateUser = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8000/api/user/${user.id}`,
      {
        name,
        firstname,
        pseudo,
        email,
        ...(password
          ? { password, password_confirmation, old_password: oldPassword }
          : {}),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("Update completed !");
  };

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
      <form onSubmit={UpdateUser} className="form-setting">
        <section>
          <div className="svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-6"
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
          <div className="row">
            <div>
              <p>Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <p>Firstname</p>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <p>Pseudo</p>
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="container-fluide">
          <h2>Update password</h2>
          <div className="row">
            <div>
              <p>Previous password</p>
              <input
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <p>New password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <p>Confirm password</p>
              <input
                type="password"
                onChange={(e) => setPassword_confirmation(e.target.value)}
              />
            </div>
          </div>
        </section>

        <button type="submit">Modifier les info</button>
      </form>

      <section className="container-fluide">
        <h2>Delete account</h2>
        <button className="btn-danger" onClick={deleteAccount}>
          Supprimer le compte
        </button>
      </section>
    </main>
  );
}

export default AccountSettings;
