import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

/**
 * Composant pour supprimer un souvenir.
 *
 * Fonctionnalités :
 * - Supprime le souvenir identifié par l'`id` dans l'URL via un appel API.
 * - Redirige vers la page d'accueil après suppression.
 *
 * @component
 *
 * @example
 * <Delete />
 */
function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await api.delete(`/souvenir/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log("Souvenir supprimé !");
    navigate("/");
  };

  return (
    <button
      className="bg-danger rounded-md px-4 py-2 hover:scale-105 text-white"
      onClick={handleDelete}
    >
      Supprimer
    </button>
  );
}

export default Delete;
