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
      <button
        className="text-center w-full hover:text-danger hover:scale-105"
        onClick={handleRemoveUser}
      >
        Déconnexion
      </button>
    </>
  );
}

export default LogoutButton;
