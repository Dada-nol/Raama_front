import axios from "axios";

function LogoutButton() {
  const handleRemoveUser = async (e) => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (e) {
      console.error("Erreur lors de la déconnexion de l'utilisateur :", e);
    }
  };
  return (
    <>
      <button className="logout" onClick={handleRemoveUser}>
        Déconnexion
      </button>
    </>
  );
}

export default LogoutButton;
