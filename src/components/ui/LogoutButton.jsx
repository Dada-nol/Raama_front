import { useAuth } from "../../context/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <button
        className="text-center w-full hover:text-danger hover:scale-105"
        onClick={handleLogout}
      >
        Déconnexion
      </button>
    </>
  );
}

export default LogoutButton;
